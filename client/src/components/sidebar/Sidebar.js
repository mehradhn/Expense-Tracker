import React, { useState, useEffect } from "react";
import { FaTh, FaUserAlt, FaBars } from "react-icons/fa";
import { BiLineChart, BiLogOut } from "react-icons/bi";
import { RiBillLine } from "react-icons/ri";
import { BsPen } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { BsTag, BsTags } from "react-icons/bs";
import "./SideBar.css";
import Cookies from "universal-cookie";
import { gql, useQuery } from "@apollo/client";

const GET_ME = gql`
  query Me {
    me {
      name
      username
      img
      _id
    }
  }
`;

const Sidebar = ({ children }) => {
  const { data, client, refetch } = useQuery(GET_ME);
  const cookies = new Cookies();
  const token = cookies.token
  const [stoken, setStoken] = useState(token)
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/dashboard/expenses",
      name: "expenses",
      icon: <RiBillLine />,
    },
    {
      path: "/dashboard/new-expense",
      name: "new",
      icon: <BsPen />,
    },
    {
      path: "/dashboard/my-profile",
      name: "edit",
      icon: <FaUserAlt />,
    },
    {
      path: "/dashboard/analytics",
      name: "analytics",
      icon: <BiLineChart />,
    },
    {
      path: "/dashboard/create-tag",
      name: "create tag",
      icon: <BsTag />,
    },
    {
      path: "/dashboard/my-tags",
      name: "tags",
      icon: <BsTags />,
    },
    {
      path: "/",
      name: "logout",
      icon: <BiLogOut />,
    },
  ];

  const logoutHandler = async (name) => {
    if (name === "logout") {
      await client.clearStore();
      refetch();
      cookies.remove("token", { path: "/" });
    }
  };

  return (
    <div className="container">
      <div style={{ width: isOpen ? "250px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            logo
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, idx) => {
          return (
            <NavLink
              onClick={() => logoutHandler(item.name)}
              to={item.path}
              key={idx}
              className="link"
            >
              <div className="icon">{item.icon}</div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_item"
              >
                {item.name}
              </div>
            </NavLink>
          );
        })}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
