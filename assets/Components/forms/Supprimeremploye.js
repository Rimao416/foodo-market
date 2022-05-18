import React from "react";

const Supprimeremploye = ({onClose,setUser,onRemove}) => {
  return (
    <>
      <h6>Voulez vous réellement supprimer cet élément</h6>
      <div className="form-flex-button">
        <button
          className="btn-info"
          onClick={() => {
            onClose();
            setUser({
              adresse: "",
              comeAt: "",
              email: "",
              firstName: "",
              lastName: "",
            });
          }}
        >
          Annuler
        </button>
        <button
          className="btn-danger"
          onClick={() => {
            onRemove();
            setUser({
              adresse: "",
              comeAt: "",
              email: "",
              firstName: "",
              lastName: "",
            });
          }}
        >
          Supprimer
        </button>
      </div>
    </>
  );
};

export default Supprimeremploye;
