import React, { useState, useEffect } from "react";
import "./departments.css";
import departementApi from "../../services/departementApi";
import { Link } from "react-router-dom";
import Title from "../../Components/title/Title";
import { HiDotsVertical } from "react-icons/hi";
import Modal from "../../Components/modal/Modal";
import "../../styles/table.css";
import TableLoader from "../../Components/loaders/TableLoader";
import { toast } from "react-toastify";
const Departments = () => {
  var i = 1;
  const [depid, setDepid] = useState(0);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [departements, setDepartements] = useState([]);
  const [launch, setLaunch] = useState(false);
  const [type,setType]=useState("")
  const [loading, setLoading] = useState(true);

  const fetchDepartements = async () => {
    try {
      const data = await departementApi
        .findAll()
        setDepartements(data)
        console.log(data)
      setLoading(false);
    } catch (error) {
      toast.error("Erreur lors du chargement des données")
    }
  };
  useEffect(() => {
    fetchDepartements()
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
          <div className="header-input">
            <input
              type="text"
              placeholder="ex Informatique"
              name=""
            />
           
          </div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Departements</th>
                <th>Actions</th>
              </tr>
            </thead>

            {!loading && (
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
                            setType("AJOUTER_DEPARTEMENT");
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
            )}
          </table>
          {loading && <TableLoader />}
        </div>
      </div>
      <Modal
        isOpened={isModalOpened}
        onClose={() => setIsModalOpened(false)}
        Type={type}
        id={depid}
        tables={departements}
        setTables={setDepartements}
        setDepid={setDepid}
      />
    </>
  );
};
export default Departments;
