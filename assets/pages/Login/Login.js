import React, { useState,useContext } from "react";
import "./Login.css";
import authApi from "../../services/authApi";
import AuthContext from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
export default function Login({history}) {
  const {setIsAuthenticated}=useContext(AuthContext)
  const [credentials, setCredentails] = useState({
    username: "",
    password: "",
  });
  const [error, setError]=useState("")
  const handleChange=(event)=>{
    const value=event.currentTarget.value
    const name=event.currentTarget.name
    setCredentails({...credentials,[name]:value})
  }
  const handleSubmit=async (event)=>{
    event.preventDefault()
    try{
      await authApi.authenticate(credentials)
      setError(" ")
      setIsAuthenticated(true)
      const token=window.localStorage.getItem('authToken')
      const decodeToken=jwtDecode(token).roles
      if(decodeToken.includes('ROLE_EMPLOYE')){
        history.replace("/accueil")
      }else{
        history.replace("/employee")
      }
      // console.log(decodeToken)
      // if(decodeToken=="ROLE_USER"){

      // }else{
        
      // }


    }catch(error){
      console.log(error.response)
      toast.error("Adresse Mail ou Mot de passe Invalide")
    }
  }
  return (
    <>
    
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <div className="login100-form-title">
              <span className="login100-form-title-1">Connexion</span>
            </div>
            {error && <div className="error"><p>{error}</p></div>}
            <form className="login100-form validate-form" onSubmit={handleSubmit}>
              <div className="wrap-input100 validate-input m-b-26">
                <span className="label-input100">Mail</span>
                <input
                  defaultValue={credentials.username}
                  onChange={handleChange}
                  className="input100"
                  type="email"
                  name="username"
                  id="username"
                  required
                  placeholder="Entrer votre mail"
                />
                <span className="focus-input100"></span>
              </div>

              <div className="wrap-input100 validate-input m-b-18">
                <span className="label-input100">Mot de passe</span>
                <input
                  defaultValue={credentials.password}
                  onChange={handleChange}
                  className="input100"
                  type="password"
                  name="password"
                  id="password"
                  required
                  placeholder="Entrez votre mot de passe"
                />
                <span className="focus-input100"></span>
              </div>

              <div className="password_forgot">
                <div>
                  <a href="#" className="txt1">
                    Mot de passe Oublié
                  </a>
                </div>
              </div>

              <div className="container-login100-form-btn">
                <button type="submit" className="login100-form-btn">Connexion</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
