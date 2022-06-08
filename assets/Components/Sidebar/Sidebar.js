import { Link } from "react-router-dom";
import React, { useContext } from "react";
import authApi from "../../services/authApi";
import "./Sidebar.css";
import AuthContext from "../../contexts/AuthContext";

export default function Sidebar({ history }) {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const handleLogout = () => {
    authApi.logout();
    setIsAuthenticated(false);
    history.push("/login");
  };
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem active">Tableau de bord</li>
            </Link>
            <Link to="/employee" className="link">
              <li className="sidebarListItem">Gestion des employés</li>
            </Link>
            <Link to="/pointage" className="link">
              <li className="sidebarListItem">Gestion de pointage</li>
            </Link>
            <Link to="/conge" className="link">
              <li className="sidebarListItem">Gestion de congé</li>
            </Link>
            <Link to="/congeuser" className="link">
              <li className="sidebarListItem">Gestion de congé (Employee)</li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Paramètres</h3>
          <ul className="sidebarList">
            <Link to="/departments" className="link">
              <li className="sidebarListItem">Départements</li>
            </Link>
            <Link to="/postes" className="link">
              <li className="sidebarListItem">Postes</li>
            </Link>
            <Link to="/" className="link">
              <li className="sidebarListItem">Autres</li>
            </Link>
            <Link to="/repos" className="link">
              <li className="sidebarListItem">Ferié</li>
            </Link>
            <li className="sidebarListItem">Reports</li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">Manage</li>
            <li className="sidebarListItem">Analytics</li>

            <li onClick={handleLogout} className="sidebarListItem">
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
