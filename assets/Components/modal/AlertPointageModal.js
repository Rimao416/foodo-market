import React from "react";
import { BiX } from "react-icons/bi";
import { createPortal } from "react-dom";
const AlertPointageModal = ({ isOpened, onClose }) => {
  if (!isOpened) {
    return null;
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
          <h5 className="modal-title">Je n'aime pas tout ça</h5>
        </div>
        <div className="modal-body">
          <h6>Voulez vous réellement supprimer cet élément</h6>
          <div className="form-flex-button">
            <button className="btn-info" onClick={() => {onClose()}}>
              Annuler
            </button>
            <button className="btn-danger" onClick={() => onRemove()}>
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default AlertPointageModal;
