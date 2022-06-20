import React from "react";

const SupprimerDemande = ({ onClose, onRemove }) => {
  return (
    <>
      <h6>Voulez vous réellement supprimer cet élément</h6>
      <div className="form-flex-button">
        <button className="btn-info" onClick={() => onClose()}>
          Annuler
        </button>
        <button className="btn-danger" onClick={() => onRemove()}>
          Supprimer
        </button>
      </div>
    </>
  );
};

export default SupprimerDemande;
