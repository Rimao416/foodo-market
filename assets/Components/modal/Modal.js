import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "./modal.css";
import departementApi from "../../services/departementApi";
import { BiX } from "react-icons/bi";
import Ajouterdep from "../forms/Ajouterdep";
import Supprimerdep from "../forms/Supprimerdep";
import { toast } from "react-toastify";

const Modal = ({
  isOpened,
  onClose,
  Type,
  id,
  tables,
  setTables,
  setDepid,
}) => {
  const [departement, setDepartement] = useState({
    Nom: "",
  });
  const [title, setTitle] = useState("Ajouter un département");
  useEffect(() => {
    if (Type == "AJOUTER_DEPARTEMENT" && id == 0) {
      setTitle("Ajouter un département");
    } else if (Type == "AJOUTER_DEPARTEMENT" && id != 0) {
      setTitle("Modifier un département");
      fetchDepartement(id);
    } else if (Type == "SUPPRIMER_DEPARTEMENT" && id != 0) {
      setTitle("Modifier un département");
    }
  }, [id]);
  const fetchDepartement = async (id) => {
    try {
      const { Nom } = await departementApi.find(id);
      // const { Nom } = data;
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
        await departementApi.update(id, departement);
        toast.info("Le département a été modifié");
        tables.map((t) => {
          if (t.id == id) {
            t.Nom = departement.Nom;
          }
        });
        //----------------------------------------------------- AJOUT DU DEPARTEMENT -----------------------------------------------------
      } else if (id == 0) {
        const response = await departementApi.create(departement);
        const { id, Nom } = response.data;
        tables.push({ id, Nom });
        setTables(tables);
        toast.success("Département ajouté avec Succès");
      }

      setDepid(0);
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
    // const originalDepartements=[...departement]
    try {
      await departementApi.delete(id);
      toast.success("La suppression du département est un succèss");
      setTables(tables.filter((table) => table.id != id));
    } catch (error) {
      toast.warning(
        "Erreur de suppression : Ce département pourrait avoir plusieurs postes"
      );
    }
    onClose();
    setDepid(0);
    setDepartement({ Nom: "" });
  };
  return createPortal(
    <div className="overlay">
      <div className="modal">
        <span id="cross">
          <BiX
            onClick={() => {
              onClose();
              setDepid(0);
              setDepartement({ Nom: "" });
            }}
          />
        </span>

        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
        </div>
        <div className="modal-body">
          {Type == "AJOUTER_DEPARTEMENT" ? (
            <Ajouterdep
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              errors={errors}
              departement={departement}
              id={id}
            />
          ) : (
            <Supprimerdep onClose={onClose} onRemove={onRemove} />
          )}
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};
export default Modal;
