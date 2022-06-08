import React from "react";
import Title from "../../Components/title/Title";
import "./conge.css";
const Conge = () => {
  return (
    <div className="conge d-flex-4">
      <div className="head d-head">
        <Title nomdepage="Dashboard" subname="Congé">
          <button>Ajouter un Férié</button>
        </Title>
        <h4>Bonjour</h4>
      </div>
    </div>
  );
};

export default Conge;
