import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserCard from "../../Components/card/UserCard";
import Usertable from "../../Components/Table/Usertable";
import "./employee.css";
import "../../styles/input.css";
import Title from "../../Components/title/Title";
import Modalemployee from "../../Components/modal/Modalemployee";
const Employee = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [table, setTable] = useState(true);
  function changeTable() {
    setTable(false);
  }
  function changeCard() {
    setTable(true);
  }

  return (
    <>
      <div className="employee">
        {/** ------------------------- PARTIE DU TITRE -------------------------------------*/}
        <div className="head">
          <div className="left_part">
            <h3>Dashboard</h3>
            <div className="body_header">
              <ul>
                <li>
                  <Link to="/">Tableau de Bord /</Link>
                  <span> Employée</span>
                </li>
              </ul>
              <div className="right_part">
                <button onClick={()=>setIsModalOpened(true)}>
                  Ajouter un département
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="search_control">
          <input type="text" placeholder="Employé Id" />
          <input type="text" placeholder="Employé Name" />
          <input type="text" placeholder="Departement" />
          <button type="submit" className="form-green">
            Rechercher
          </button>
        </div>
        {table ? (
          <>
            <UserCard /> <UserCard />
            <UserCard />
            <UserCard />
          </>
        ) : (
          <Usertable />
        )}
      </div>
      <Modalemployee isOpened={isModalOpened}
      onClose={()=>setIsModalOpened(false)}
      />
    </>
  );
};

export default Employee;
