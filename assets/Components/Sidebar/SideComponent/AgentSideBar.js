import React from "react";
import SideBarList from "./SideBarList";
import List from "./List";
const AgentSideBar = () => {
  return (
    <>
      <SideBarList title="Dashboard">
        <List classname="sidebarListItem" link="Tableau de bord" goTo="/" />
        <List
          classname="sidebarListItem"
          link="Gestion des employés"
          goTo="/employee"
        />
        <List
          classname="sidebarListItem"
          link="Gestion de pointage"
          goTo="/pointage"
        />
        <List
          classname="sidebarListItem"
          link="Gestion de congé"
          goTo="/conge"
        />
      </SideBarList>
      <SideBarList title="Paramètres">
        <List
          classname="sidebarListItem"
          link="Départements"
          goTo="/departments"
        />
        <List classname="sidebarListItem" link="Postes" goTo="/postes" />
        <List classname="sidebarListItem" link="Ferié" goTo="/repos" />
      </SideBarList>
    </>
  );
};

export default AgentSideBar;
