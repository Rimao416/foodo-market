import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "./modal.css";
import "../../styles/input.css";
import "../../styles/button.css";
import axios from "axios";
import { BiX } from "react-icons/bi";
import Ajouterdep from "../forms/Ajouterdep";
import Supprimerdep from "../forms/Supprimerdep";

/** <Ajouterdep
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            errors={errors}
            departement={departement}
          /> */
const Modal = ({ isOpened, onClose, Type, id, tables, setTables }) => {
  const [departement, setDepartement] = useState({
    Nom: "",
  });
  const [title, setTitle] = useState("Ajouter un département");
  const [retour, setRetour] = useState(<></>);
  useEffect(() => {
    if (Type == "AJOUTER_DEPARTEMENT") {
      setTitle("Ajouter un département");
      /*
      <Supprimerdep onClose={onClose} onRemove={onRemove}/>
      setRetour(
        <Ajouterdep
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          errors={errors}
          departement={departement}
          id={id}
        />
      );*/
    } else if (Type == "MODIFIER_DEPARTEMENT" && id != 0) {
      setTitle("Modifier un département");
      fetchDepartement(id);
      /* setRetour(
        <Ajouterdep
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          errors={errors}
          departement={departement}
          id={id}
        />
      );*/
    } else if (Type == "SUPPRIMER_DEPARTEMENT" && id != 0) {
      setTitle("Modifier un département");
    }
  }, [id]);
  const fetchDepartement = async (id) => {
    try {
      const data = await axios
        .get(`http://localhost:8000/api/departements/` + id)
        .then((response) => response.data);
      const { Nom } = data;
      setDepartement({ Nom });
    } catch (error) {
      console.log("Une erreur");
    }
  };
  const [errors, setError] = useState({
    Nom: "",
  });

  if (!isOpened) {
    return null;
  }
  const handleChange = (event) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;
    setDepartement({ ...departement, [name]: value });
  };
  /*--------------------------------------------------------------MODIFICATION D'UN DEPARTEMENT------------------------------------*/
  const handleSubmit = async (event) => {
    event.preventDefault();
    var apiError = {};
    try {
      if (id != 0) {
        await axios.put(
          "http://localhost:8000/api/departements/" + id,
          departement
        );
        tables.map((t)=>{
            if(t.id==id){
                t.Nom=departement.Nom
            }
        })
        //----------------------------------------------------- AJOUT DU DEPARTEMENT -----------------------------------------------------
      } else if(id==0) {
        const response = await axios.post(
          "http://localhost:8000/api/departements",
          departement
        );
        const { id, Nom } = response.data;
        tables.push({ id, Nom });
        setTables(tables);
      }
      
      setDepartement({ Nom: "" });
    } catch (error) {
      error.response.data.violations.forEach((violation) => {
        apiError[violation.propertyPath] = violation.message;
      });
      setError(apiError);
    }
    if (Object.keys(apiError).length == 0) {
      onClose();
      setError({ Nom: "" });
    }
  };

  //------------------------------------------------------------SUPPRESSION D'UN DEPARTEMENT-------------------------------------------------
  const onRemove = async (event) => {
    console.log(id);
    try {
      const response = await axios.delete(
        "http://localhost:8000/api/departements/" + id
      );
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
              setDepartement({ Nom: "" });
            }}
          />
        </span>

        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
        </div>
        <div className="modal-body">
          <Ajouterdep
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            errors={errors}
            departement={departement}
            id={id}
          />
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};
export default Modal;
