import React, { useState, useEffect } from "react";
import { BiX } from "react-icons/bi";
import { createPortal } from "react-dom";
import "./modal.css";
import postApi from "../../services/postApi";
import departementApi from "../../services/departementApi";
import Ajouterpost from "../forms/Ajouterpost";
import Supprimerpost from "../forms/Supprimerpost";
const Postmodal = ({ isOpened, onClose, Type, id, tables, setTables }) => {
  const [errors, setErrors] = useState({
    Designation: "",
  });

  const [poste, setPoste] = useState({
    designation: "",
    departement: "",
  });
  useEffect(() => {
    fetchDepartements();
  }, []);
  useEffect(() => {
    if (id != 0) {
      fetchPoste(id);
    }
  }, [id]);

  const [departements, setDepartements] = useState([]);
  const handleChange = (event) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;
    setPoste({ ...poste, [name]: value });
  };
  const fetchPoste = async (id) => {
    try {
      const { Designation, departement } = await postApi.find(id);
      var mondepartement = departement.Nom;
      console.log({ Designation, mondepartement });
      setPoste({ designation: Designation, departement: mondepartement });
    } catch (error) {
      console.log(error.response);
    }
  };

  const fetchDepartements = async () => {
    try {
      const data = await departementApi
        .findAll()
        .then((data) => setDepartements(data));
    } catch (error) {
      console.log(error.response);
    }
  };
  if (!isOpened) {
    return null;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    /************************************************************************************PARTIE DU NOM******************************************** */
    var apiError = {};
    try {
      /*****************************************MMODIFICATION DU POSTE***************************** */
      if (id != 0) {
        const response = await postApi.update(
          id,
          poste.designation,
          poste.departement
        );
        tables.map((t) => {
          if (t.id == id) {
            t.Designation = poste.designation;
            t.departement.Nom = response.data.departement.Nom;
          }
        });
        //*****************************************AJOUT DU POSTE****************************** */
      } else if (id == 0) {
        const response = await postApi.create(
          poste.designation,
          poste.departement
        );
        const { id, Designation, departement } = response.data;
        var Nom = departement.Nom;
        tables.push({
          id,
          Designation,
          departement: {
            Nom,
          },
        });
        setTables(tables);
      }
      setPoste({ designation: "" });
      //      onClose()
    } catch (error) {
      error.response.data.violations.forEach((violation) => {
        apiError[violation.propertyPath] = violation.message;
      });
      setErrors(apiError);
    }
    if (Object.keys(apiError).length == 0) {
      onClose();
      setErrors({ Designation: "" });
    }
  };
  /***********************************SUPPRESSION DU POSTE ************************** */
  const onRemove = async (event) => {
    try {
      const response = await postApi.delete(id);
      setTables(tables.filter((table) => table.id != id));
      onClose();
    } catch (error) {
      console.log("erreur");
    }
  };
  return createPortal(
    <div className="overlay">
      <div className="modal">
        <span id="cross">
          <BiX
            onClick={() => {
              onClose();
              setPoste({ designation: "" });
            }}
          />
        </span>
        <div className="modal-header">
          <h5 className="modal-title">
            {id > 0 ? "Modification du poste" : "Ajout du poste"}
          </h5>
        </div>
        <div className="modal-body">
          {Type == "AJOUTER_POSTE" ? (
            <Ajouterpost
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              errors={errors}
              poste={poste}
              id={id}
              departements={departements}
            />
          ) : (
            <Supprimerpost onClose={onClose} onRemove={onRemove} />
          )}
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Postmodal;