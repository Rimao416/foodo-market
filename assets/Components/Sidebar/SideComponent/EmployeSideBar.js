import React from "react";
import SideBarList from "./SideBarList";
import List from "./List";
const EmployeSideBar = () => {
  return (
    <>
      <SideBarList title="Dashboard">
        <List
          classname="sidebarListItem"
          link="Accueil"
          goTo="/accueil"
        />
        <List
          classname="sidebarListItem"
          link="Gestion de congé (Employee)"
          goTo="/congeuser"
        />
      </SideBarList>
    </>
  );
};

export default EmployeSideBar;
