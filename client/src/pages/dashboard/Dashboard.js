import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
function Dashboard() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [stoken, setStoken] = useState(token)
  useEffect(() => {
    if (!stoken) navigate("/sign-up");
  }, [stoken]);
  return (
    <Sidebar>
      <div className="outlet">
        <Outlet />
      </div>
    </Sidebar>
  );
}

export default Dashboard;
