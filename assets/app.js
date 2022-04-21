import React, { useState } from "react";
import ReactDom from "react-dom";
import {
  BrowserRouter as Router,
  HashRouter,
  Switch,
  Route,
  withRouter
} from "react-router-dom";
import authApi from "./services/authApi";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Topbar from "./Components/topbar/Topbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import Poste from "./pages/Poste/Poste";
import Employee from "./pages/Employee/Employee";
import Departments from "./pages/Departments/Departments";
import AuthContext from "./contexts/AuthContext"

authApi.setup();

const App = () => {
  //TODO : il faudrait par défaut qu'on demande à notre API si on est connecté ou pas
  const [isAuthenticated, setIsAuthenticated] = useState(authApi.isAuthenticated);
  const SideBardWithRouter=withRouter(Sidebar)
  const contextValue={
    isAuthenticated,
    setIsAuthenticated
  }
  return (
    <AuthContext.Provider value={contextValue}>
    <HashRouter>
      <Switch>
        <Route
          path="/login"
          exact
          component={Login}      />
        <>
          <Topbar/>
          <div className="container">
            <SideBardWithRouter/>
            <Route path="/" exact component={Home} />
            <Route path="/departments" exact component={Departments} />
            <Route path="/postes" exact component={Poste} />
            <Route path="/employee" exact component={Employee} />
          </div>
        </>
      </Switch>
    </HashRouter>
    </AuthContext.Provider>
  );
};
import "./styles/app.css";
ReactDom.render(<App />, document.getElementById("root"));
