import React,{useState} from "react";
import { Link } from "react-router-dom";
import "./title.css";
import {Mechange,getModal,changeMoi} from '../../services/titleService'
const Title = ({ nomdepage, subname, children }) => {

const [maValeur,setMaValeur]=useState(false)


  return (
    <>
      <div className="left_part">
        <h3>{nomdepage}</h3>
        <div className="body_header">
          <ul>
            <li>
              {nomdepage.length > 0 ? (
                <Link to="/">Tableau de Bord /</Link>
              ) : (
                ""
              )}
              <span> {subname}</span>
            </li>
          </ul>
          <div className="right_part">
            {children}
          </div>
        </div>
      </div>
      {getModal(nomdepage)}
    </>
  );
};

export default Title;
