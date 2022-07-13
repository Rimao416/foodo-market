import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";
import Usercard from "../../Components/card/Usercard";
import Usertable from "../../Components/Table/Usertable";
import "./employee.css";
import "../../styles/input.css";
import Title from "../../Components/title/Title";
import "../../styles/button.css";
import Modalemployee from "../../Components/modal/Modalemployee";
import TableLoader from "../../Components/loaders/TableLoader";
import axios from "axios";
import { BsFillGrid3X3GapFill, BsFillGrid1X2Fill } from "react-icons/bs";
const Employee = () => {
  var i = 1;
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [depid, setDepid] = useState(0);
  const [view, setView] = useState("table");
  const [employes, setEmploye] = useState([]);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchEmployes = async () => {
    try {
      const data = await axios
        .get("http://localhost:8000/api/users")
        .then((response) => response.data);
      setEmploye(data);
      console.log(data[0].roles);
      setLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    fetchEmployes();
  }, []);

  return (
    <>
      <div className="employee">
        {/** ------------------------- PARTIE DU TITRE -------------------------------------*/}
        <div className="head">
          <Title nomdepage="Dashboard" subname="Employé">
            <span onClick={() => setView("card")}>
              <BsFillGrid1X2Fill />
            </span>
            <span onClick={() => setView("table")}>
              <BsFillGrid3X3GapFill />
            </span>
            <button
              onClick={() => {
                setIsModalOpened(true);
                setDepid(0);
                setType("AJOUTER_EMPLOYE");
              }}
            >
              Ajouter un un Employé
            </button>
          </Title>
        </div>
        <div className="header-input">
          <input type="text" placeholder="ex Omari Kayumba" name="" />
          <input
            type="text"
            placeholder="ex. mariem@gmail.com"
            value=""
            name=""
          />
          <input type="text" placeholder="15" value="" name="" />
        </div>
        {view == "card" ? (
          <>
            {employes.map((employe) => (
              <Usercard
                id={employe.id}
                adresse={employe.adresse}
                nom={employe.firstName}
                prenom={employe.lastName}
                photo={employe.photo}
                poste={employe.poste.Designation}
                venu={employe.comeAt}
                isOpened={isModalOpened}
                onClose={() => setIsModalOpened(false)}
                onOpen={() => setIsModalOpened(true)}
                setId={setDepid}
                type={type}
                setType={setType}
              />
            ))}
          </>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Mail</th>
                  <th>Adresse</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {!loading && (
                <tbody>
                  {employes.map((employe) => (
                    <>
                      {employe.roles.includes("ROLE_EMPLOYE") && (
                        <tr key={employe.id}>
                          <td>{employe.firstName}</td>
                          <td>{employe.lastName}</td>
                          <td>{employe.email}</td>
                          <td>{employe.adresse}</td>
                          <td>
                            <div className="form-group-button">
                              <button
                                onClick={() => {
                                  setDepid(employe.id);
                                  setIsModalOpened(true);
                                  setType("AJOUTER_EMPLOYE");
                                }}
                                id={employe.id}
                              >
                                Modifier
                              </button>
                              <button
                                onClick={() => {
                                  setDepid(employe.id);
                                  setIsModalOpened(true);
                                  setType("SUPPRIMER_EMPLOYE");
                                }}
                              >
                                Supprimer
                              </button>
                            </div>
                            <span></span>
                          </td>
                        </tr>
                      )}{" "}
                    </>
                  ))}
                </tbody>
              )}
            </table>
            {loading && <TableLoader />}
          </>
        )}
      </div>
      <Modalemployee
        isOpened={isModalOpened}
        onClose={() => setIsModalOpened(false)}
        type={type}
        id={depid}
        table={employes}
        setTable={setEmploye}
        setId={setDepid}
      />
    </>
  );
};

export default Employee;
