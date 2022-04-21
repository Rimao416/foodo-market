import React from "react";

export default function Ajouterdep ({handleSubmit,handleChange,errors,departement,id}) {
  return (
    <>
       <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="departement" className="label-input">Entrer le nom du département</label>
            <input
              type="text"
              className={errors.Nom.length > 0 ? "is-invalid": ""}
              placeholder="ex. Departement 655"
              name="Nom"
              defaultValue={departement.Nom}
              onChange={handleChange}
            />
            {errors.Nom.length > 0 && (
              <p className="error-input">{errors.Nom}</p>
            )}
            <div className="submit-section">
              <button className="form-first " type="submit">
                {id > 0 ? 'Modifier': 'Ajouter'}
              </button>
            </div>
        </form>
    </>
  );
}
