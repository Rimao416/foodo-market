import React from "react";
import { Link } from "react-router-dom";
import "./title.css";
const Title = ({ nomdepage, subname, buttonValue }) => {
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
            <button>{buttonValue}</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Title;
