import React from 'react'

const AjouterFerie = ({handleSubmit,handleChange,conge}) => {
    return (
        <>
             <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="nom" className="label-input">
              Dénomination
            </label>
            <input
              type="text"
              placeholder="ex. L'Aid"
              id="nom"
              name="nom"
              defaultValue={conge.nom}
              onChange={handleChange}
              required
            />
            <label htmlFor="date" className="label-input">
              Date du ferié
            </label>
            <input
              type="date"
              placeholder="ex. Departement 655"
              id="startAt"
              onChange={handleChange}
              name="startAt"
              defaultValue={conge.startAt}
              required
            />
            <label htmlFor="jour" className="label-input">
              Nombre des jours
            </label>
            <input
              type="number"
              placeholder="1"
              id="jour"
              name="jour"
              defaultValue={conge.jour}
              onChange={handleChange}
              required
            />

            <div className="submit-section">
              <button className="form-first " type="submit">
                Enregistrer
              </button>
            </div>
          </form>
        </>
    )
}

export default AjouterFerie