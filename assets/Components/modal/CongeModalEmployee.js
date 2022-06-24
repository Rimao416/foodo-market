import React, { useState, useEffect } from "react";
import { BiX } from "react-icons/bi";
import Select from "../forms/Select";
import { createPortal } from "react-dom";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import AjouterDemande from "../forms/AjouterDemande";
import SupprimerDemande from "../forms/SupprimerDemande";
const CongeModalEmployee = ({
  isOpened,
  onClose,
  Type,
  id,
  tables,
  setTables,
  setDepid,
}) => {
  const [typeConge, setTypeConge] = useState("");
  const [conges, setConges] = useState([]);
  const [image, setName] = useState("");
  const [conge, setConge] = useState({
    DateDebut: "",
    DateFin: "",
    motif: "",
    file: "",
    explication: "",
    status: "EN ATTENTE",
  });
  const fetchModal = async (id) => {
    try {
      const data = await axios
        .get("http://localhost:8000/api/conges/" + id)
        .then((response) => response.data);
      setConge({
        DateDebut: moment(data.DateDebut).format("YYYY-MM-DD"),
        DateFin: moment(data.DateFin).format("YYYY-MM-DD"),
        motif: data.motif,
        explication: data.explication,
      });

      // console.log(DateDebut)
      // const { DateDebut, DateFin, motif, explication } = await axios
      //   .get("http://localhost:8000/api/conges/" + id)
      //   .then((response) => response.data);
      //   console.log(DateDebut)
      // setConge({ DateDebut, DateFin, motif, explication });
      console.log(data);
    } catch (error) {
      console.log(error.response);
      toast.error("Erreur lors du chargement, veuillez recommencer");
    }
  };
  useEffect(() => {
    if (id != 0) {
      fetchModal(id);
    }
  }, [id]);

  if (!isOpened) {
    return null;
  }
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
    // let file = new FormData();
    // file.append("file", conge.file);
    // // console.log(file.get("file"));
    // try {
    //   await axios
    //     .post("http://localhost:8000/api/media_objects", file=conge.file, {
    //     })
    //     .then((response) => console.log(response.data));
    // } catch (error) {
    //   console.log(error.response);
    // }
    try {
      if (id != 0) {
        const response = await axios.put(
          "http://localhost:8000/api/conges/" + id,
          conge
        );
          setConge({
            DateDebut: "",
            DateFin: "",
            motif: "",
            explication: "",
          });
          tables.map((t) => {
            if (t.id == id) {
              t.DateDebut = response.data.DateDebut;
              t.DateFin = response.data.DateFin;
              t.motif = response.data.motif;
              t.explication = response.data.explication;
            }
          });
          // console.log(tables);
          // console.log(response.data.DateDebut);

          setDepid(0);
          onClose();
          toast.info("Modification effectuée avec Succès");
      } else {
        const data = await axios
          .post("http://localhost:8000/api/conges", conge)
          .then((response) => response.data);
        tables.push({
          DateDebut:conge.DateDebut,
          DateFin: conge.DateFin,
          motif: data.motif,
          explication: data.explication,
          status: "EN ATTENTE",
        });
        setConge({
          DateDebut: "",
          DateFin: "",
          motif: "",
          explication: "",
        });
        setDepid(0);
        toast.success(
          "Demande de congé en attente, vous recevrez une réponse d'ici peu"
        );
        onClose();
      }
    } catch (error) {
      // toast.error("Erreur lors de la demande de congé");
      console.log(error.response);
    }
  };
  const onRemove = async (event) => {
    try {
      const response = await axios.delete(
        "http://localhost:8000/api/conges/" + id
      );
      setTables(tables.filter((table) => table.id != id));
      setConge({
        DateDebut: "",
        DateFin: "",
        motif: "",
        explication: "",
      });
      // setPoste({ designation: "" });
      setDepid(0);
      onClose();
      toast.success("Suppression avec Succès");
    } catch (error) {
      console.log("erreur");
    }
  };
  function dependantDropdown(value) {
    console.log("toto");
    if (value == "texte") {
      return (
        <>
          <textarea
            maxLength="255"
            name="explication"
            cols="30"
            rows="10"
            onChange={handleChange}
            defaultValue={conge.explication}
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
  // useEffect(() => {

  // },[]);
  return createPortal(
    <div className="overlay">
      <div className="modal">
        <span id="cross">
          <BiX
            onClick={() => {
              onClose();
              setDepid(0)
              setConge({
                DateDebut: "",
                DateFin: "",
                motif: "",
                explication: "",
                
              });
            }}
          />
        </span>
        <div className="modal-header">
          <h5 className="modal-title">
            Demande de congé {id != 0 && "(Modification)"} 
          </h5>
        </div>
        <div className="modal-body">
          {Type == "AJOUTER_DEMANDE" ? (
            <AjouterDemande
              handleSubmit={handleSubmit}
              conge={conge}
              handleChange={handleChange}
              handleChoose={handleChoose}
              dependantDropdown={dependantDropdown(typeConge)}
              typeConge={typeConge}
              id={id}
            />
          ) : (
            <SupprimerDemande onClose={onClose} onRemove={onRemove} />
          )}
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};
export default CongeModalEmployee;
