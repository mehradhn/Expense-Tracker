import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Home.css";
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

function Home() {
  const {data, client } = useQuery(GET_ME)
  const cookies = new Cookies();
  const token = cookies.get("token");
  useEffect(() => {}, [token]);
  const navigate = useNavigate();
  const navigateToSignUp = () => {
    navigate("/sign-up");
  };
  const navigateToPortfolio = () => navigate("/dashboard");
  const logoutHandler = async () => {
    cookies.remove("token", { path: "/" })
    client.clearStore()
    navigate('')
  };
  return (
    <>
      <div className="navbar-home">
        <nav>
          <h2 className="logo">
            Fin<span>ance</span>
          </h2>
          <ul>
            {token && (
              <button
                onClick={logoutHandler}
                className="logout-btn"
                type="button"
              >
                LOGOUT
              </button>
            )}
          </ul>
          {!token ? (
            <button
              onClick={navigateToSignUp}
              className="sign-up-dash"
              type="button"
            >
              SIGN-UP
            </button>
          ) : (
            <button
              onClick={navigateToPortfolio}
              className="sign-up-dash"
              type="button"
            >
              PORTFOLIO
            </button>
          )}
        </nav>
      </div>
    </>
  );
}

export default Home;
