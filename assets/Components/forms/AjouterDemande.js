import React from "react";
import Select from "./Select";
const AjouterDemande = ({handleSubmit,conge,handleChange,handleChoose,dependantDropdown,typeConge,id}) => {
  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="departement" className="label-input">
          Date de début
        </label>
        <input
          type="date"
          defaultValue={conge.DateDebut}
          required
          name="DateDebut"
          onChange={handleChange}
        />
        <label htmlFor="departement" className="label-input">
          Date de Fin
        </label>
        <input
          type="date"
          defaultValue={conge.DateFin}
          required
          name="DateFin"
          onChange={handleChange}
        />
        <label htmlFor="departement" className="label-input">
          Motif
        </label>
        <Select name="motif" value="conge" onChange={handleChange}>
          <option value="">--------------------------------</option>
          <option value="Congé maladie">Congé maladie</option>
          <option value="Congé annuel">Congé annuel</option>
          <option value="Congé sans solde">Congé sans solde</option>
          <option value="Congé de maternité">Congé de maternité</option>
          <option value="Congé payé">Congé payé</option>
          <option value="Décès">Décès</option>
          <option value="Autre">Autre</option>
        </Select>
        <pre></pre>
        <div>
          <div className="conge-choix">
            <div className="form-group">
              <input
                type="radio"
                value="texte"
                name="file"
                id=""
                onChange={handleChoose}
              />
              <span>Joindre un text</span>
            </div>
            <div className="form-group">
              <input
                value="fichier"
                type="radio"
                name="file"
                id=""
                onChange={handleChoose}
              />
              <span>Joindre un Fichier</span>
            </div>
          </div>
        </div>
        {dependantDropdown}

        <div className="submit-section">
          <button className="form-first " type="submit">
            {id > 0 ? "Modifier" : "Ajouter"}
          </button>
          <button
            className="form-cancel"
            onClick={() => {
              onClose();
            }}
          >
            Annuler
          </button>
        </div>
      </form>
    </>
  );
};

export default AjouterDemande;
