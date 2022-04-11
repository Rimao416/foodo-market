import React, { useState } from "react";
import { Link } from "react-router-dom";
import Createuser from "../../Components/form/Createuser";
import { HiDotsVertical } from "react-icons/hi";
import UserCard from "../../Components/card/UserCard";
import { FiAlignJustify, FiAlignLeft } from "react-icons/fi";
import { BiListOl, BiMenu } from "react-icons/bi";
import Usertable from "../../Components/Table/Usertable"
import "./employee.css";
import Title from "../../Components/title/Title";
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
          
          <Title nomdepage={"Employee"} subname={"Employee"} buttonValue={"Ajouter un employé"}/>
          {/*<FiAlignJustify />
                </div>
                <div className="icons card" onClick={()=>changeTable()}>
                  <FiAlignLeft />
  </div>*/}
        </div>
        <div className="search_control">
          <input type="text" placeholder="Emploee Id" />
          <input type="text" placeholder="Emploee Name" />
          <input type="text" placeholder="Departement" />
          <button type="submit">Rechercher</button>
        </div>
        {table ? <UserCard/> : <Usertable/> }
        
      </div>
    </>
  );
};

export default Employee;
