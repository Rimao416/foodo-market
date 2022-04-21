import React from "react";
import Select from './Select'
const Ajouterpost = ({ handleSubmit, handleChange, errors, poste, id,departements }) => {
  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="departement" className="label-input">
          Entrer le nom du Poste
        </label>

        <input
          type="text"
          className={errors.Designation.length > 0 ? "is-invalid" : ""}
          placeholder="ex. Departement 655"
          name="designation"
          onChange={handleChange}
          defaultValue={poste.designation}
        />
        {errors.Designation.length > 0 && (
          <p className="error-input">{errors.Designation}</p>
        )}

        <pre></pre>
        <Select
          name="departement"
          label="Choisir un   département"
          value={poste.departement}
          onChange={handleChange}
        >
          <option value="">----------------------------</option>
          {departements.map((departement) => (
            <option key={departement.id} value={departement.id}>
              {departement.Nom}
            </option>
          ))}
        </Select>

        <div className="submit-section">
          <button className="form-first " type="submit">
            {id > 0 ? "Modifier" : "Ajouter"}
          </button>
        </div>
      </form>
    </>
  );
};

export default Ajouterpost;
