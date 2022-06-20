import React from "react";
import { BiX } from "react-icons/bi";
import { createPortal } from "react-dom";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";
const DetailDemande = ({ isOpened, onClose, user, setUser, demande }) => {
  if (!isOpened) {
    return null;
  }
  function buttonControl(value) {
    if (value == "ACCEPTE") {
      return (
        <>
          <button className="red" onClick={() => handleRefuse(user.id)}>
            Refuser
          </button>
          <button className="yellow" onClick={() => onClose()}>
            Annuler
          </button>
        </>
      );
    } else if (value == "EN ATTENTE") {
      return (
        <>
          <button className="green" onClick={() => handleAccept(user.id)}>
            Accepter
          </button>
          <button className="red" onClick={() => handleRefuse(user.id)}>
            Refuser
          </button>
          <button className="yellow" onClick={() => onClose()}>
            Annuler
          </button>
        </>
      );
    } else if ((value = "REJETEE")) {
      return (
        <>
          <button className="green" onClick={() => handleAccept(user.id)}>
            Accepter
          </button>
          <button className="yellow" onClick={() => onClose()}>
            Annuler
          </button>
        </>
      );
    }
  }
  const handleAccept = async (id) => {
    try {
      axios.put("http://localhost:8000/api/conges/" + id, {
        status: "ACCEPTE",
      });
      toast.info("Merci pour votre confirmation, l'employé en sera notifié");
      onClose();
      console.log(user);
      demande.map((t) => {
        if (t.id == user.id) {
          console.log((t.status = "ACCEPTE"));
        }
      });

      // setUser({
      //   status:"ACCEPTE"
      // })
    } catch (error) {}
  };
  const handleRefuse = async (id) => {
    try {
      axios.put("http://localhost:8000/api/conges/" + id, {
        status: "REJETEE",
      });
      // setUser({
      //   status:"REFUSE"
      // })
      onClose();
      toast.info("Merci pour votre confirmation, l'employé en sera notifié");
      demande.map((t) => {
        if (t.id == user.id) {
          console.log((t.status = "REJETEE"));
        }
      });
    } catch (error) {}
  };
  return createPortal(
    <div className="overlay">
      <div className="modal w-500">
        <span id="cross">
          <BiX
            onClick={() => {
              onClose();
            }}
          />
        </span>
        <div className="modal-header">
          <h5 className="modal-title">
            <h3>Demande de Congé</h3>
          </h5>
        </div>
        <div className="modal-body">
          <div className="demande">
            <div className="header">
              <img src={user.profile} alt="" width="90" />
              <h5>{user.nom + "|" + user.prenom}</h5>
              <hr />
            </div>
            <div className="body">
              <div className="flex-dialog">
                <h6>Departement</h6>
                <h6>{user.departement}</h6>
              </div>
              <hr />
              <div className="flex-dialog">
                <h6>Poste</h6>
                <h6>{user.poste}</h6>
              </div>
              <hr />
              <div className="flex-dialog">
                <h6>Demande allant </h6>
                <h6>
                  Du{" "}
                  {moment(user.dateDebut).format("DD-MM-YYYY") +
                    " au " +
                    moment(user.dateFin).format("DD-MM-YYYY")}
                </h6>
              </div>
              <hr />
              <div className="flex-dialog">
                <h6>Motif</h6>
                <h6>{user.motif}</h6>
              </div>
              <hr />
              {user.explication.length > 0 && (
                <>
                  <div className="flex-dialog">
                    <h6>Details</h6>
                    <h6>{user.explication}</h6>
                  </div>
                  <hr />
                </>
              )}
              <div className="button-control">{buttonControl(user.status)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default DetailDemande;
