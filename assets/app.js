import React from "react";
import ReactDom from "react-dom";
import {
  BrowserRouter as Router,
  HashRouter,
  Switch,
  Route,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Topbar from "./Components/topbar/Topbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import Employee from "./pages/Employee/Employee";
import Departments from "./pages/Departments/Departments";

const App = () => {
  return (
    <HashRouter>
      <Switch>
          <Route path="/login"> <Login/> </Route>
        <>
          <Topbar />
          <div className="container">
            <Sidebar />
            <Route path="/" exact component={Home} />
            <Route path="/employee" exact component={Employee}/>
            <Route path="/departments" exact component={Departments}/>
          </div>
        </>
      </Switch>
    </HashRouter>
  );
};
ReactDom.render(<App />, document.getElementById("root"));
import "./styles/app.css";

