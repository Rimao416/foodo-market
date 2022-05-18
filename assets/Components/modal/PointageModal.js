import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Select from "../forms/Select";
import { BiX } from "react-icons/bi";
import "./modal.css";
import { toast } from "react-toastify";
const PointageModal = ({ isOpened, onClose }) => {
  if (!isOpened) {
    return null;
  }
  return createPortal(
    <div className="overlay">
      <div className="modal">
        <span id="cross">
          <BiX onClick={() => onClose()} />
        </span>

        <div className="modal-header">
          <h5 className="modal-title">Télétravail</h5>
        </div>
        <div className="modal-body">
          <form className="formulaire">
            <div className="form-grap">
              <div className="form-group">
                <label htmlFor="firstName" className="label-input">
                  Nom de l'employé
                </label>
                <input
                  type="time"
                  placeholder="ex. Mariem"
                  name="firstName"
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName" className="label-input">
                  Prénom de l'employé
                </label>
                <input type="text" placeholder="ex. Omari" />
              </div>
            </div>
            <div className="submit-section">
              <button className="form-first " type="submit">
                Ajouter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};
export default PointageModal;
