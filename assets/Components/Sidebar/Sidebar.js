import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import authApi from "../../services/authApi";
import "./Sidebar.css";
import AuthContext from "../../contexts/AuthContext";
import AgentSideBar from "./SideComponent/AgentSideBar";
import EmployeSideBar from "./SideComponent/EmployeSideBar";
export default function Sidebar({ history }) {
  const roles = authApi.getUserInfo();
  console.log(roles);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const handleLogout = () => {
    authApi.logout();
    setIsAuthenticated(false);
    history.push("/login");
  };
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        {roles.includes("ROLE_AGENT") ? (
          <>
            <AgentSideBar />
          </>
        ) : (
          <>
            <EmployeSideBar />
          </>
        )}

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li onClick={handleLogout} className="sidebarListItem">
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
