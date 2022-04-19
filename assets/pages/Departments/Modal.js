import React, { useState, useEffect } from "react";
import { BiX } from "react-icons/bi";
import "../../styles/modal.css";
import "../../styles/button.css";
import "../../styles/input.css";
import axios from "axios";

const Modal = ({ id, onYourPopup }) => {
  const fetchDepartement = async (id) => {
    try {
      const data = await axios
        .get(`http://localhost:8000/api/departements/` + id)
        .then((response) => response.data);
      console.log(data);
      const { Nom } = data;
      setDepartement({ Nom });
    } catch (error) {
      console.log("erreur");
    }
  };

  useEffect(() => {
    if (id != 0) {
      fetchDepartement(id);
    }
  }, [id]);

  const [departement, setDepartement] = useState({
    Nom: "",
  });

  const RemoveModal = () => {
    document.querySelector("div.modal").classList.remove("active");
    document.querySelector("div.departments").classList.remove("active");
  };

  const [errors, setError] = useState({
    Nom: "",
  });

  const handleChange = (event) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;
    setDepartement({ ...departement, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (id != 0) {
        onYourPopup(false);
      } else {
        const response = await axios.post(
          "http://localhost:8000/api/departements",
          departement
        );
      }
    } catch (error) {
      var apiError = {};
      error.response.data.violations.forEach((violation) => {
        apiError[violation.propertyPath] = violation.message;
      });
      setError(apiError);
      console.log(apiError);
    }
  };

  return (
    <div className="modal">
      <span
        id="cross"
        onClick={() => {
          RemoveModal();
          onYourPopup(false);
        }}
      >
        <BiX />
      </span>
      <form className="form" onSubmit={handleSubmit}>
        <div className="modal-header">
          <h5 className="modal-title">
            {id > 0 ? "Modifier un département" : "Ajouter un département"}
          </h5>
        </div>
        <div className="modal-body">
          <label htmlFor="departement">Entrer le nom du département</label>
          <input
            type="text"
            className={errors.Nom.length > 0 && "is-invalid"}
            placeholder="ex. Departement 655"
            name="Nom"
            defaultValue={departement.Nom}
            onChange={handleChange}
          />
          {errors.Nom.length > 0 && <p className="error-input">{errors.Nom}</p>}
          <div className="submit-section">
            <button className="form-first " type="submit">
              {id > 0 ? "Modifier" : "Ajouter"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Modal;
