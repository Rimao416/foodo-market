import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import Postmodal from "../../Components/modal/Postmodal";
import axios from 'axios'
import "./poste.css";
const Poste = () => {
  var i=1
  const [depid, setDepid] = useState(0);
  const [type, setType] = useState("");
  const [postes,setPostes]=useState([])
  const fetchPostes=async ()=>{
    try{
    const data= await axios.get("http://localhost:8000/api/postes")
    .then(response=>response.data['hydra:member']) 
    setPostes(data)
  }catch(error){
    console.log(error.response)
  }
  }
  useEffect(()=>{
    fetchPostes()
  },[])
  const [isModalOpened, setIsModalOpened] = useState(false);

  return (
    <>
      <div className="poste">
        <div className="head">
          <div className="left_part">
            <h3>Dashboard</h3>
            <div className="body_header">
              <ul>
                <li>
                  <Link to="/">Tableau de Bord /</Link>
                  <span> Poste</span>
                </li>
              </ul>
              <div className="right_part">
                <button
                  onClick={() => {
                    setDepid(0)
                    setIsModalOpened(true);
                    setType("AJOUTER_POSTE")
                  }}
                >
                  Ajouter un poste
                </button>
              </div>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Désignation</th>
                <th>Département</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {postes.map(poste => <tr key={poste.id}>
                <td>{i++}</td>
                <td>{poste.Designation}</td>
                <td>{poste.departement.Nom}</td>
                <td>
                  <div className="form-group-button">
                    <button className="info" onClick={()=>{
                      setDepid(poste.id) 
                      setIsModalOpened(true)
                      setType("AJOUTER_POSTE")
                    }}
                    id={poste.id}
                    >Modifier</button>
                    <button className="danger"onClick={()=>{
                      setDepid(poste.id) 
                      setIsModalOpened(true)
                      setType("SUPPRIMER_POSTE")
                    }}
                    id={poste.id}>Supprimer</button>
                  </div>
                  <span></span>
                </td>
              </tr>)}
              

            </tbody>
          </table>
        </div>
      </div>
      <Postmodal
        isOpened={isModalOpened}
        onClose={() => setIsModalOpened(false)}
        Type={type}
        id={depid}
        tables={postes} 
        setTables={setPostes}
      />
    </>
  );
};

export default Poste;
