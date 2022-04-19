import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserCard from "../../Components/card/UserCard";
import Usertable from "../../Components/Table/Usertable"
import "./employee.css";
import  "../../styles/input.css";
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
          <input type="text" placeholder="Employé Id" />
          <input type="text" placeholder="Employé Name" />
          <input type="text" placeholder="Departement" />
          <button type="submit" className="form-green">Rechercher</button>
        </div>
        {table ?<><UserCard/> <UserCard/><UserCard/><UserCard/></>: <Usertable/> }
        
      </div>
    </>
  );
};

export default Employee;
