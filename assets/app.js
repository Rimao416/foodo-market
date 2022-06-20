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

authApi.setup();

const App = () => {
  //TODO : il faudrait par défaut qu'on demande à notre API si on est connecté ou pas
  const [isAuthenticated, setIsAuthenticated] = useState(
    authApi.isAuthenticated
  );
  const PrivateRoute = ({ path, component }) => {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated ? (
      <Route path={path} exact component={component} />
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

              <PrivateRoute path="/postes" component={Poste} />
              <PrivateRoute path="/employee" component={Employee} />
              <PrivateRoute path="/pointage" component={Pointage} />
              <PrivateRoute path="/pointage/:id" component={PointageUser} />
              <PrivateRoute
                path="/pointage/teletravail"
                component={Teletravail}
              />
              <PrivateRoute path="/departments" component={Departments} />
              <PrivateRoute path="/conge" component={Conge} />
              <PrivateRoute path="/congeuser" component={CongeEmployee} />
              <PrivateRoute path="/repos" component={Repos} />
              <PrivateRoute path="/" component={Home} />
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
import PointageUser from "./pages/PointageUser/PointageUser"
ReactDom.render(<App />, document.getElementById("root"));
