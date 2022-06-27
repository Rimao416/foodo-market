import React, { useState } from "react";
import { BiX } from "react-icons/bi";
import axios from "axios";
import { createPortal } from "react-dom";
import Select from "../forms/Select";
const AlertPointageModal = ({
  isOpened,
  onClose,
  dateGroup,
  onOpenExport,
  setDateGroup,
  setYearMonth,
}) => {
  if (!isOpened) {
    return null;
  }
  const [date, setDate] = useState("");
  const handleChange = (event) => {
    const { name, value } = event.target;
    setDate(value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(date);
    // ICI REQUETE
    //
    // onOpenExport()
    try {
      axios
        .get(`http://localhost:8000/api/enregistrements/pointage/${date}/data`)
        .then((response) => setDateGroup(response.data));
      setYearMonth(date);
      onOpenExport();
      onClose();
    } catch (error) {
      console.log(error);
    }
    //   }
  };
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
        <form onSubmit={handleSubmit}>
          <div className="modal-header">
            <h5 className="modal-title">Choisissez le mois d'exportation</h5>
          </div>
          <div className="modal-body">
            {/* <Select label="Choississez le mois">
              <option value="">--------------</option>
              <option value="01">Janvier</option>
              <option value="02">Février</option>
              <option value="03">Mars</option>
              <option value="04">Avril</option>
              <option value="05">Mai</option>
              <option value="06">Juin</option>
              <option value="07">Juillet</option>
              <option value="08">Aout</option>
              <option value="09">Septembre</option>
              <option value="10">Octobre</option>
              <option value="11">Novembre</option>
              <option value="12">Decembre</option>
            </Select> */}
            <label>Entrez une date</label>
            <input
              type="text"
              placeholder="p.e: 04-2022"
              onChange={handleChange}
              required
            />
            <pre></pre>
            <div className="form-flex-button">
              <button className="btn-info">Continuer</button>
              <button
                className="btn-danger"
                onClick={() => {
                  onClose();
                }}
              >
                Annuler
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default AlertPointageModal;
