import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import moment from "moment";
import { BiX } from "react-icons/bi";
import axios from "axios";
import AjouterFerie from "../forms/AjouterFerie";
import SupprimerRepos from "../forms/SupprimerRepos";

const ModalFerie = ({
  isOpened,
  onClose,
  Type,
  id,
  tables,
  setTables,
  setDepid,
}) => {
  const [conge, setConge] = useState({
    nom: "",
    startAt: "",
    jour: "",
  });
  const [title, setTitle] = useState("Ajouter un poste");
  useEffect(() => {
    if (Type == "AJOUTER_REPOS" && id == 0) {
      setTitle("Ajouter un férié");
    } else if (Type == "AJOUTER_REPOS" && id != 0) {
      setTitle("Modifier un férié");
      console.log(id);
      fetchRepos(id);
    } else if (Type == "SUPPRIMER_REPOS" && id != 0) {
      setTitle("Supprimer lrepose");
    }
  }, [id]);
  const fetchRepos = async (id) => {
    try {
      const data = await axios
        .get(`http://localhost:8000/api/repos/` + id)
        .then((response) => response.data);
      console.log(data);
      setConge({
        nom: data.nom,
        startAt: moment(data.repos[0].startAt).format("YYYY-MM-DD"),
        jour: data.repos.length,
      });
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    setConge({ ...conge, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      /*****************************************MODIFICATION REPOS*************************** */
      if (id != 0) {
        let data = await axios
          .put(`http://localhost:8000/api/repos/${id}`, conge)
          .then((response) => response.data);
        try {
          await axios
            .delete(`http://localhost:8000/api/repos/${id}/delete`)
            .then((response) => response.data);
        } catch (error) {
          console.log(error.response);
        }
        const { startAt, jour } = conge;
        console.log(startAt + "  " + jour);
        var day = moment(startAt).format("YYYY-MM-DD");
        for (var i = 1; i <= jour; i++) {
          try {
            await axios.post("http://localhost:8000/api/jours", {
              startAt: day,
              repos: `api/repos/${data.id}`,
            });
            day = moment(day).add(1, "day").format("YYYY-MM-DD");
            toast.success("Modification effectuée avec succèss");
          } catch (error) {
            toast.error("Erreur lors de l'ajout");
          }
        }
        tables.map((t) => {
          if (t.id == id) {
            t.nom = conge.nom;
            t.repos[0].startAt = conge.startAt;
          }
        });
        /*****************************************AJOUT REPOS*************************** */
      } else if (id == 0) {
        let data = await axios
          .post("http://localhost:8000/api/repos", conge)
          .then((response) => response.data);
        const { id, nom } = data;
        const { startAt, jour } = conge;
        console.log(id);
        console.log(data);
        var day = moment(startAt).format("YYYY-MM-DD");
        /**************************************INITIALISATION VALUE***************************** */
        tables.push({
          id,
          nom,
          repos: [
            {
              startAt,
            },
          ],
        });
        setTables(tables);
        for (var i = 1; i <= jour; i++) {
          try {
            await axios.post("http://localhost:8000/api/jours", {
              startAt: day,
              repos: `api/repos/${id}`,
            });
            day = moment(day).add(1, "day").format("YYYY-MM-DD");
            toast.success("Jour ajouté avec Succès");
          } catch (error) {
            toast.error("Erreur lors de l'ajout");
          }
        }
      }
      setConge({
        nom: "",
        startAt: "",
        jour: "",
      });
      setDepid(0);
      onClose();
    } catch (error) {
      console.log(error.response);
    }
  };
  /*************************************************************SUPPRESSION REPOS************************ */
  const onRemove = async (event) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/repos/${id}`
      );
      setTables(tables.filter((table) => table.id != id));
      onClose();
      setDepid(0);
      setConge({
        nom: "",
        startAt: "",
        jour: "",
      });
    } catch (error) {
      toast.info("Erreur lors de la suppression");
    }
  };
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
              setDepid(0);
              setConge({ nom: "", startAt: "", jour: "" });
            }}
          />
        </span>

        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
        </div>
        <div className="modal-body">
          {Type == "AJOUTER_REPOS" ? (
            <AjouterFerie
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              conge={conge}
            />
          ) : (
            <SupprimerRepos onRemove={onRemove} onClose={onClose} />
          )}
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};
export default ModalFerie;
