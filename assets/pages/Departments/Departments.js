import React, { useState, useEffect } from "react";
import "./departments.css";
import Deletedep from "./Deletedep";
import axios from "axios";
import Title from "../../Components/title/Title";
import { Link } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";
import table from "../../styles/table.css";
import Modal from "../../Components/modal/Modal";

import { registry } from "chart.js";
import "../../Components/modal/Modal";

const Departments = () => {
  var i=0;
  const [depid, setDepid] = useState(0);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [departements, setDepartements] = useState([]);
  const [launch, setLaunch] = useState(false);
  const [type, setType] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/departements")
      .then((response) => response.data["hydra:member"])
      .then((data) => setDepartements(data));
  }, []);

  return (
    <>
      <div className="departments">
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
                <button
                  onClick={() => {
                    setDepid(0);
                    setIsModalOpened(true);
                    setType("AJOUTER_DEPARTEMENT");
                  }}
                >
                  Ajouter un département
                </button>
              </div>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Departements</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {departements.map((departement) => (
                <tr key={departement.id}>
                  <td>{i++}</td>
                  <td>{departement.Nom}</td>
                  <td>
                    <div className="form-group-button">
                      <button
                        className="info"
                        onClick={() => {
                          setDepid(departement.id);
                          setIsModalOpened(true);
                          setType("MODIFIER_DEPARTEMENT");
                          setLaunch(true);
                        }}
                        id={departement.id}
                      >
                        Modifier
                      </button>
                      <button
                        className="danger"
                        onClick={() => {
                          setIsModalOpened(true);
                          setDepid(departement.id);
                          setType("SUPPRIMER_DEPARTEMENT");
                        }}
                        id={departement.id}
                      >
                        Supprimer
                      </button>
                    </div>
                    <span></span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        isOpened={isModalOpened}
        onClose={() => setIsModalOpened(false)}
        Type={type}
        id={depid}
        tables={departements}
        setTables={setDepartements}
      />
    </>
  );
}
export default Departments;
