import React, { useEffect, useState } from "react";
import Title from "../../Components/title/Title";
import DetailDemande from "../../Components/modal/DetailDemande";
import axios from "axios";
import "./conge.css";
const Conge = () => {
  const [user, setUser] = useState({
    nom: "",
    prenom: "",
    dateDebut: "",
    dateFin: "",
    motif: "",
    status: "",
    file: "",
    id: 0,
    departement: "",
    poste: "",
    profile: "",
    explication:"",
  });
  const [isModalOpened, setIsModalOpened] = useState(false);
  function status(value) {
    if (value == "EN ATTENTE") {
      return "attente";
    }else if(value =="ACCEPTE"){
      return "accepte"
    }else if(value =="REJETEE"){
      return "refus"
    }
  }
  let i = 1;
  const fetchDemande = async () => {
    const data = await axios
      .get("http://localhost:8000/api/conges")
      .then((response) => response.data);
    console.log(data);
    setDemande(data);
  };
  useEffect(() => {
    fetchDemande();
  }, []);
  const [demande, setDemande] = useState([]);
  return (
    <>
      <div className="conge d-flex-4">
        <div className="head d-head">
          <Title nomdepage="Dashboard" subname="Congé">
            <button>Ajouter un Férié</button>
          </Title>
          <div className="header-input">
            <input
              type="text"
              placeholder="Entrez le nom de l'employé"
              name="noms"
            />
            <input
              type="text"
              placeholder="Entrez le nom du département"
              name="departement"
            />
           
          </div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nom & Prenom</th>
                <th>Departement</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {demande.map((d) => (
                <tr key={d.id}>
                  <td>{i++}</td>
                  <td> {d.user.firstName + " " + d.user.lastName}</td>
                  <td>{d.user.poste.departement.Nom}</td>
                  <td>
                    <span className={status(d.status)}>{d.status}</span>
                  </td>
                  <td
                    onClick={() => {
                      setIsModalOpened(true);
                    }}
                  >
                    {" "}
                    <span
                      className="blue"
                      onClick={() =>
                        setUser({
                          nom: d.user.firstName,
                          prenom: d.user.lastName,
                          dateDebut: d.DateDebut,
                          dateFin: d.DateFin,
                          motif: d.motif,
                          status: d.status,
                          file: d.file,
                          id: d.id,
                          departement: d.user.poste.departement.Nom,
                          poste: d.user.poste.Designation,
                          profile: d.user.photo,
                          explication:d.explication
                        })
                      }
                    >
                      Voir Plus
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <DetailDemande
        isOpened={isModalOpened}
        onClose={() => setIsModalOpened(false)}
        user={user}
        setUser={setUser}
        demande={demande}
      />
    </>
  );
};

export default Conge;
