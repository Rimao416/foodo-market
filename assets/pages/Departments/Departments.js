import React, { useState, useEffect } from "react";
import "./departments.css";
import departementApi from "../../services/departementApi";
import { Link } from "react-router-dom";
import Title from "../../Components/title/Title";
import { HiDotsVertical } from "react-icons/hi";
import Modal from "../../Components/modal/Modal";
import "../../styles/table.css";
const Departments = () => {
  var i = 1;
  const [depid, setDepid] = useState(0);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [departements, setDepartements] = useState([]);
  const [launch, setLaunch] = useState(false);
  const [type, setType] = useState("");
  useEffect(() => {
    departementApi.findAll().then((data) => setDepartements(data));
  }, []);

  return (
    <>
      <div className="departments">
        <div className="head">
          <Title nomdepage="Dashboard" subname="Departements">
            <button
              onClick={() => {
                setDepid(0);
                setIsModalOpened(true);
                setType("AJOUTER_DEPARTEMENT");
              }}
            >
              Ajouter un département
            </button>
          </Title>
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
};
export default Departments;
