import React, { useState, useEffect } from "react";
import "./congeEmployee.css";
import CongeModalEmployee from "../../Components/modal/CongeModalEmployee";
import Title from "../../Components/title/Title";
import Postmodal from "../../Components/modal/Postmodal";
import axios from "axios";
import moment from "moment";
export default function CongeEmployee() {
  function status(value) {
    if (value == "EN ATTENTE") {
      return "attente";
    }else if(value =="ACCEPTE"){
      return "accepte"
    }else if(value =="REJETEE"){
      return "refus"
    }
  }
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [conges, setConges] = useState([]);
  const [depid, setDepid] = useState(0);
  const [type, setType] = useState("");
  var i = 1;
  const fetchConge = async () => {
    const data = await axios
      .get("http://localhost:8000/api/conges/single")
      .then((response) => response.data);
    console.log(data);
    setConges(data);
  };
  useEffect(() => {
    fetchConge();
  }, []);
  return (
    <>
      <div className="conge d-flex-4">
        <div className="head d-head">
          <Title nomdepage="Dashboard" subname="Congé">
            <button
              onClick={() => {
                setDepid(0);
                setIsModalOpened(true);
                setType("AJOUTER_DEMANDE");
              }}
            >
              Faire une demande de congé
            </button>
          </Title>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Demande Du </th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {conges.map((conge) => (
                <tr key={conge.id}>
                  <td>{i++}</td>
                  <td>
                    <span className="blue">
                      {moment(conge.DateDebut).format("DD/MM/YYYY")} au{" "}
                      {moment(conge.DateFin).format("DD/MM/YYYY")}
                    </span>
                  </td>
                  <td>
                    <span className={status(conge.status)}>{conge.status}</span>
                  </td>
                  <td>
                    <div className="form-group-button">
                      <button
                        className="info"
                        onClick={() => {
                          setDepid(conge.id);
                          setIsModalOpened(true);
                          setType("AJOUTER_DEMANDE");
                        }}
                        id={conge.id}
                      >
                        Modifier
                      </button>
                      <button
                        className="danger"
                        onClick={() => {
                          setDepid(conge.id);
                          setIsModalOpened(true);
                          setType("SUPPRIMER_DEMANDE");
                        }}
                        id={conge.id}
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <CongeModalEmployee
        isOpened={isModalOpened}
        onClose={() => setIsModalOpened(false)}
        Type={type}
        id={depid}
        tables={conges}
        setTables={setConges}
        setDepid={setDepid}
      />
    </>
  );
}
