import React, { useState, useContext } from "react";
import ReactDom from "react-dom";
import {
  BrowserRouter as Router,
  HashRouter,
  Switch,
  Route,
  withRouter,
  Redirect,
} from "react-router-dom";
import authApi from "./services/authApi";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Topbar from "./Components/topbar/Topbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import Poste from "./pages/Poste/Poste";
import Pointage from "./pages/Pointage/Pointage";
import Employee from "./pages/Employee/Employee";
import Departments from "./pages/Departments/Departments";
import AuthContext from "./contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const userInfo = authApi.getUserInfo();

authApi.setup();
console.log("Salut tout le monde");
const App = () => {
  //TODO : il faudrait par défaut qu'on demande à notre API si on est connecté ou pas
  const [isAuthenticated, setIsAuthenticated] = useState(
    authApi.isAuthenticated
  );
  const PrivateRoute = ({ path, component, permission }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const role = authApi.getUserInfo();
    console.log(role);
    return isAuthenticated ? (
      //VER
      role.includes(permission) ? (
        <Route path={path} component={component} exact />
      ) : role.includes("ROLE_AGENT") ? (
        <Redirect to="/" />
      ) : (
        <Redirect to="/accueil" />
      )
    ) : (
      <Redirect to="/login" />
    );
  };
  const SideBardWithRouter = withRouter(Sidebar);
  const contextValue = {
    isAuthenticated,
    setIsAuthenticated,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      <HashRouter>
        <Switch>
          <Route path="/login" exact component={Login} />
          <>
            <Topbar />
            <div className="container">
              <SideBardWithRouter />
              <PrivateRoute
                path="/postes"
                component={Poste}
                permission="ROLE_AGENT"
              />
              <PrivateRoute
                path="/employee"
                component={Employee}
                permission="ROLE_AGENT"
              />
              <PrivateRoute
                path="/pointage"
                component={Pointage}
                permission="ROLE_AGENT"
              />
              <PrivateRoute
                path="/pointage/teletravail"
                component={Teletravail}
                permission="ROLE_AGENT"
              />
              <PrivateRoute
                path="/pointage/user/:id"
                component={PointageUser}
                permission="ROLE_AGENT"
              />
              <PrivateRoute
                path="/accueil"
                component={HomeEmploye}
                permission="ROLE_EMPLOYE"
              />
              <PrivateRoute
                path="/departments"
                component={Departments}
                permission="ROLE_AGENT"
              />
              <PrivateRoute
                path="/conge"
                component={Conge}
                permission="ROLE_AGENT"
              />
              <PrivateRoute
                path="/congeuser"
                component={CongeEmployee}
                permission="ROLE_EMPLOYE"
              />
              <PrivateRoute
                path="/repos"
                component={Repos}
                permission="ROLE_AGENT"
              />
              <PrivateRoute
                path="/"
                component={Home}
                permission="ROLE_AGENT"
              />
            </div>
          </>
        </Switch>
      </HashRouter>
      <ToastContainer position={toast.POSITION.TOP_RIGHT} />
    </AuthContext.Provider>
  );
};
import "./styles/app.css";
import Teletravail from "./pages/Teletravail/Teletravail";
import Repos from "./pages/Repos/Repos";
import Conge from "./pages/Conge/Conge";
import CongeEmployee from "./pages/CongeEmployee/CongeEmployee";
import PointageUser from "./pages/PointageUser/PointageUser";
import HomeEmploye from "./pages/HomeEmploye/HomeEmploye";
ReactDom.render(<App />, document.getElementById("root"));
