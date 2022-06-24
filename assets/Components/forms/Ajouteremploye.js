import moment from 'moment'
import React from 'react'
import Select from './Select'
const Ajouteremploye = ({handleSubmit,errors,user,handleChange,id,departements,postes,handleChoose}) => {
    return (
        <>
         <form className="formulaire" onSubmit={handleSubmit}>
            <div className="form-grap">
              <div className="form-group">
                <label htmlFor="firstName" className="label-input">
                  Nom de l'employé
                </label>
                <input
                  className={errors.firstName && "is-invalid"}
                  type="text"
                  placeholder="ex. Mariem"
                  name="firstName"
                  defaultValue={user.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <p className="error-input">{errors.firstName}</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="lastName" className="label-input">
                  Prénom de l'employé
                </label>
                <input
                  type="text"
                  placeholder="ex. Omari"
                  className={errors.lastName && "is-invalid"}
                  name="lastName"
                  defaultValue={user.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <p className="error-input">{errors.lastName}</p>
                )}
              </div>
            </div>
            {id == 0 && (
              <>
                <div className="form-grap">
                  <div className="form-group">
                    <label htmlFor="password" className="label-input">
                      Mot de passe
                    </label>
                    <input
                      type="password"
                      placeholder="ex. **********************"
                      name="password"
                      className={errors.password && "is-invalid"}
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <p className="error-input">{errors.password}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="passwordConfirm" className="label-input">
                      Confirmez le mot de passe
                    </label>
                    <input
                      type="password"
                      placeholder="ex. *********************"
                      name="passwordConfirm"
                      className={errors.passwordConfirm && "is-invalid"}
                      onChange={handleChange}
                    />
                    {errors.passwordConfirm && (
                      <p className="error-input">{errors.passwordConfirm}</p>
                    )}
                  </div>
                </div>
              </>
            )}

            <div className="form-grap">
              <div className="form-group">
                <label htmlFor="email" className="label-input">
                  Adresse Mail
                </label>
                <input
                  type="email"
                  placeholder="ex. johndoe@gmail.com"
                  className={errors.email && "is-invalid"}
                  name="email"
                  defaultValue={user.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="error-input">{errors.email}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="adresse" className="label-input">
                  Adresse d'habitation
                </label>
                <input
                  type="text"
                  placeholder="ex. Av. Hédi Nouira"
                  className={errors.adresse && "is-invalid"}
                  name="adresse"
                  defaultValue={user.adresse}
                  onChange={handleChange}
                />
                {errors.adresse && (
                  <p className="error-input">{errors.adresse}</p>
                )}
              </div>
            </div>
            <div className="form-grap">
              <div className="form-group">
                <Select
                className={errors.Departement && "is-invalid"}
                  name="Departement"
                  label="Choisir un   département"
                  onChange={handleChoose}
                >
                  <option value="">--------------------------</option>
                  {departements.map((departement) => (
                    <option key={departement.id} value={departement.id}>
                      {departement.Nom}
                    </option>
                  ))}
                </Select>
                {errors.Departement && <p className="error-input">{errors.Departement}</p>}
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
                      <option value="">Choisissez un poste</option>
                      {postes.map((poste) => (
                        <option key={poste.id} value={poste.id}>
                          {poste.Designation}
                        </option>
                      ))}
                    </Select>
                  </>
                ) : (
                  <>
                    <p>Veuillez sélectionner un département ayant des postes</p>
                  </>
                )}
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
                  className={errors.comeAt && "is-invalid"}
                  name="comeAt"
                  // defaultValue= {moment(user.comeAt).format("yyyy-mm-DD")}
                  defaultValue={user.comeAt}
                  onChange={handleChange}
                  required
                />
                {errors.comeAt && (
                  <p className="error-input">{errors.comeAt}</p>
                )}
              </div>
            </div>

            <div className="submit-section">
              <button className="form-first " type="submit">
              {id> 0 ? 'Modifier un Employé' : 'Ajouter un employé'}
              </button>
            </div>
          </form>
            
        </>
    )
}

export default Ajouteremploye