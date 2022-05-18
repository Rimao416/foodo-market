import React, { useState, useEffect } from "react";
import TableLoader from "../../Components/loaders/TableLoader";
import postApi from "../../services/postApi";
import { Link } from "react-router-dom";
import Title from "../../Components/title/Title";
import Postmodal from "../../Components/modal/Postmodal";
import "./poste.css";

const Poste = () => {
  var i = 1;
  const [depid, setDepid] = useState(0);
  const [type, setType] = useState("");
  const [postes, setPostes] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchPostes = async () => {
    try {
      const data = await postApi.findAll();
      setPostes(data);
      setLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    fetchPostes();
  }, []);
  const [isModalOpened, setIsModalOpened] = useState(false);

  return (
    <>
      <div className="poste">
        <div className="head">
          <Title nomdepage="Dashboard" subname="Poste">
            <button
              onClick={() => {
                setDepid(0);
                setIsModalOpened(true);
                setType("AJOUTER_POSTE");
              }}
            >
              Ajouter un poste
            </button>
          </Title>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Désignation</th>
                <th>Département</th>
                <th>Actions</th>
              </tr>
            </thead>
            {!loading && (
            <tbody>
              {postes.map((poste) => (
                <tr key={poste.id}>
                  <td>{i++}</td>
                  <td>{poste.Designation}</td>
                  <td>{poste.departement.Nom}</td>
                  <td>
                    <div className="form-group-button">
                      <button
                        className="info"
                        onClick={() => {
                          setDepid(poste.id);
                          setIsModalOpened(true);
                          setType("AJOUTER_POSTE");
                        }}
                        id={poste.id}
                      >
                        Modifier
                      </button>
                      <button
                        className="danger"
                        onClick={() => {
                          setDepid(poste.id);
                          setIsModalOpened(true);
                          setType("SUPPRIMER_POSTE");
                        }}
                        id={poste.id}
                      >
                        Supprimer
                      </button>
                    </div>
                    <span></span>
                  </td>
                </tr>
              ))}
            </tbody>
              )}
          </table>
          {loading && <TableLoader />}
        </div>
      </div>
      <Postmodal
        isOpened={isModalOpened}
        onClose={() => setIsModalOpened(false)}
        Type={type}
        id={depid}
        tables={postes}
        setTables={setPostes}
        setDepid={setDepid}
      />
    </>
  );
};

export default Poste;
