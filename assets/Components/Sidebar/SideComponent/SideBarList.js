import React from "react";
export default function SideBarList({ title,children }) {
  return (
    <>
      <div className="sidebarMenu">
        <h3 className="sidebarTitle">{title}</h3>
        <ul className="sidebarList">
         {children}
        </ul>
      </div>
    </>
  );
}
