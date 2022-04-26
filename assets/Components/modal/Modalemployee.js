import React, { useState, useEffect } from "react";
import "./modal.css";
import { createPortal } from "react-dom";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-initials-sprites";
import axios from "axios";
import departementApi from "../../services/departementApi";
import postApi from "../../services/postApi";
import Select from "../forms/Select";
import { BiX } from "react-icons/bi";
export default function Modalemployee({ isOpened, onClose }) {
  const [departements, setDepartements] = useState([]);
  const [postes, setPostes] = useState([]);
  const fetchDepartements = async () => {
    try {
      const data = await departementApi
        .findAll()
        .then((data) => setDepartements(data));
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    fetchDepartements();
  }, []);
  const [user, setUser] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    photo: "",
    adresse: "",
    comeAt: "",
  });
  const handleChange = (event) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;
    //    setUser({ ...user, [name]: value });
    setUser({
      ...user,
      [name]: value,
      photo: `https://avatars.dicebear.com/api/initials/${
        user.firstName + " " + user.lastName
      }.svg`,
    });
  };
  const handleChoose = async (event) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    console.log(value);
    const response = await postApi.findOneById(value);
    console.log(response);
    setPostes(response);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    /*if((user.firstName.length > 0) && (user.lastName.length > 0)){
        setUser({
          photo:`https://avatars.dicebear.com/api/initials/${user.firstName+" "+user.lastName}.svg`
        })
      }*/

    console.log(user);
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
            }}
          />
        </span>

        <div className="modal-header">
          <h5 className="modal-title">Ajouter un Employee</h5>
        </div>
        <div className="modal-body">
          <form className="formulaire" onSubmit={handleSubmit}>
            <div className="form-grap">
              <div className="form-group">
                <label htmlFor="firstName" className="label-input">
                  Nom de l'employé
                </label>
                <input
                  type="text"
                  placeholder="ex. Mariem"
                  name="firstName"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName" className="label-input">
                  Prénom de l'employé
                </label>
                <input
                  type="text"
                  placeholder="ex. Omari"
                  name="lastName"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-grap">
              <div className="form-group">
                <label htmlFor="password" className="label-input">
                  Mot de passe
                </label>
                <input
                  type="password"
                  placeholder="ex. **********************"
                  name="password"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="ConfirmPassword" className="label-input">
                  Confirmez le mot de passe
                </label>
                <input
                  type="password"
                  placeholder="ex. *********************"
                  name="ConfirmPassword"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-grap">
              <div className="form-group">
                <label htmlFor="email" className="label-input">
                  Adresse Mail
                </label>
                <input
                  type="email"
                  placeholder="ex. johndoe@gmail.com"
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="adresse" className="label-input">
                  Adresse d'habitation
                </label>
                <input
                  type="text"
                  placeholder="ex. Av. Hédi Nouira"
                  name="adresse"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-grap">
              <div className="form-group">
                <Select
                  name="Departement"
                  label="Choisir un   département"
                  onChange={handleChoose}
                >
                  <option value="">----------------------------</option>
                  {departements.map((departement) => (
                    <option key={departement.id} value={departement.id}>
                      {departement.Nom}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="form-group">
                {postes.length > 0 ? (
                  <>
                    {" "}
                    <Select
                      name="poste"
                      label="Choisir un poste"
                      onChange={handleChange}
                    >
                      {postes.map((poste) => (
                        <option key={poste.id} value={poste.id}>
                          {poste.Designation}
                        </option>
                      ))}
                    </Select>
                  </>
                ) : <><p>Veuillez sélectionner un département ayant des postes</p></>}
              </div>
            </div>
            <div className="form-grap">
              <div className="form-group">
                <label htmlFor="comeAt" className="label-input">
                  Date de venue dans l'entreprise
                </label>
                <input
                  type="date"
                  placeholder="ex. Av. Hédi Nouira"
                  name="comeAt"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="submit-section">
              <button className="form-first " type="submit">
                Ajouter un Employé
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
}
