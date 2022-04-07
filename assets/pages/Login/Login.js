import React from "react";
import "./Login.css";
export default function Login() {
  return (
    <>
      <div className="login">
        <div className="login-wrap">
          <div className="login-html">
            <input
              id="tab-1"
              type="radio"
              name="tab"
              className="sign-in"
              checked
            />
            <label htmlFor="tab-1" className="tab">
              Connexion
            </label>
            <input id="tab-2" type="radio" name="tab" className="sign-up" />
            <label for="tab-2" className="tab"></label>
            <div className="login-form">
              <div className="sign-in-htm">
                <div className="group">
                  <label htmlFor="user" className="label">
                    Adresse Mail
                  </label>
                  <input id="user" type="text" className="input" />
                </div>
                <div className="group">
                  <label htmlFor="pass" className="label">
                    Mot de passe
                  </label>
                  <input
                    id="pass"
                    type="password"
                    className="input"
                    data-type="password"
                  />
                </div>
                <div className="group">
                  <input id="check" type="checkbox" className="check" checked />
                  <label htmlFor="check">
                    <span className="icon"></span> Me garder connecter
                  </label>
                </div>
                <div className="group">
                  <input
                    type="submit"
                    className="button"
                    value="Connectez-vous"
                  />
                </div>
                <div className="hr"></div>
                <div className="foot-lnk">
                  <a href="#forgot">Mot de passe oublié</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
