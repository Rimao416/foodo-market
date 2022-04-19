import React from "react";
import { BiX } from "react-icons/bi";
import "../../styles/button.css";
import "../../styles/modal.css";

const Deletedep = ({ id, onYourPopup }) => {
  const RemoveModal = () => {
    document.querySelector("div.modal").classList.remove("active");
    document.querySelector("div.departments").classList.remove("active");
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
      <div className="modal-header">
        <h5 className="modal-title">Suppression</h5>
      </div>
      <div className="modal-body">
        <h6>Voulez vous réellement supprimer cet élément</h6>
        <div className="form-flex-button">
          <button
            className="btn-info"
            onClick={() => {
              RemoveModal();
              onYourPopup(false);
            }}
          >
            Annuler
          </button>
          <button
            className="btn-danger"
            onClick={() => {
              RemoveModal();
              onYourPopup(false);
            }}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};
export default Deletedep;
