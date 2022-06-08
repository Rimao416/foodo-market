import React, { useState, useEffect } from "react";
import { BiX } from "react-icons/bi";
import Select from "../forms/Select";
import { createPortal } from "react-dom";
import axios from "axios";
const CongeModalEmployee = ({ isOpened, onClose }) => {
  if (!isOpened) {
    return null;
  }

  const [typeConge, setTypeConge] = useState("");
  const [image, setName] = useState("");
  const [conge, setConge] = useState({
    DateDebut: "",
    DateFin: "",
    motif: "",
    file: "",
  });
  const handleChoose = (event) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;
    setTypeConge(value);
    console.log(typeConge);
  };
  const handleChange = (event) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;
    setConge({ ...conge, [name]: value });
  };
  const handleImage = (event) => {
    const image = event.currentTarget.files[0];
    const { name } = image;
    setConge({ ...conge, file: name });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/api/conges", conge)
      .then((response) => console.log(response.data));

    console.log(conge);
  };

  function dependantDropdown(value) {
    console.log("toto");
    if (value == "texte") {
      return (
        <>
          <textarea
            maxLength="255"
            name="file"
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </>
      );
    } else if (value == "fichier") {
      return (
        <>
          <input type="file" name="file" onChange={handleImage} />
        </>
      );
    }
  }
  return createPortal(
    <div className="overlay">
      <div className="modal">
        <span id="cross">
          <BiX
            onClick={() => {
              onClose();
            }}
          />
        </span>
        <div className="modal-header">
          <h5 className="modal-title">Demande de congé</h5>
        </div>
        <div className="modal-body">
          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="departement" className="label-input">
              Date de début
            </label>
            <input
              type="date"
              defaultValue="22/05/2022"
              name="DateDebut"
              onChange={handleChange}
            />
            <label htmlFor="departement" className="label-input">
              Date de Fin
            </label>
            <input
              type="date"
              defaultValue="22/05/2022"
              name="DateFin"
              onChange={handleChange}
            />
            <label htmlFor="departement" className="label-input">
              Motif
            </label>
            <Select name="motif" value="conge" onChange={handleChange}>
              <option value="">--------------------------------</option>
              <option value="Congé maladie">Congé maladie</option>
              <option value="Congé annuel">Congé annuel</option>
              <option value="Congé sans solde">Congé sans solde</option>
              <option value="Congé de maternité">Congé de maternité</option>
              <option value="Congé payé">Congé payé</option>
              <option value="Décès">Décès</option>
              <option value="Autre">Autre</option>
            </Select>
            <pre></pre>
            <div>
              <div className="conge-choix">
                <div className="form-group">
                  <input
                    type="radio"
                    value="texte"
                    name="file"
                    id=""
                    onChange={handleChoose}
                  />
                  <span>Joindre un text</span>
                </div>
                <div className="form-group">
                  <input
                    value="fichier"
                    type="radio"
                    name="file"
                    id=""
                    onChange={handleChoose}
                  />
                  <span>Joindre un Fichier</span>
                </div>
              </div>
            </div>
            {dependantDropdown(typeConge)}

            <div className="submit-section">
              <button className="form-first " type="submit">
                Ajouter
              </button>
              <button
                className="form-cancel"
                onClick={() => {
                  onClose();
                }}
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};
export default CongeModalEmployee;
