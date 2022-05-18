import React, { useState } from "react";
import "./pointage.css";
import Title from "../../Components/title/Title";
import PointageModal from "../../Components/modal/PointageModal";
import { Link } from "react-router-dom/cjs/react-router-dom";
import Teletravail from "../Teletravail/Teletravail";
const Pointage = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  return (
    <>
      <div className="pointage">
        <div className="head">
          <Title nomdepage="Dashboard" subname="Pointage">
          <input type="file" />
            <button style={{color:"white"}}>
              <Link to="/pointage/teletravail/">Télétravail</Link>{" "}
            </button>
          </Title>
        </div>
      </div>
    </>
  );
};
export default Pointage;
