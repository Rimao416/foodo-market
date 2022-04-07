import React, { useState } from "react";
import { Link } from "react-router-dom";
import Createuser from "../../Components/form/Createuser";
import { HiDotsVertical } from "react-icons/hi";
import UserCard from "../../Components/card/UserCard";
import { FiAlignJustify, FiAlignLeft } from "react-icons/fi";
import { BiListOl, BiMenu } from "react-icons/bi";

import "./employee.css";
const Employee = () => {
const [table,setTable]=useState(true)
function changeTable() {
    setTable(false)
}
function changeCard() {
    setTable(true)
}

  return (
    <>
      <div className="employee">
        {/** ------------------------- PARTIE DU TITRE -------------------------------------*/}
        <div className="head">
          <div className="left_part">
            <h3>Employee</h3>
            <div className="body_header">
              <ul>
                <li>
                  <Link to="/">Tableau de Bord</Link>
                  <span>/ Employee</span>
                </li>
              </ul>
              <div className="right_part">
                <div className="icons table" onClick={()=>changeCard()}>
                  <FiAlignJustify />
                </div>
                <div className="icons card" onClick={()=>changeTable()}>
                  <FiAlignLeft />
                </div>
                <button>Ajouter</button>
              </div>
            </div>
          </div>
        </div>
        <div className="search_control">
          <input type="text" placeholder="Emploee Id" />
          <input type="text" placeholder="Emploee Name" />
          <input type="text" placeholder="Departement" />
          <button type="submit">Rechercher</button>
        </div>
        {table ? <UserCard/> : <>fhdsjkfhsdkjhjfhsdk</> }
        
      </div>
    </>
  );
};

export default Employee;
