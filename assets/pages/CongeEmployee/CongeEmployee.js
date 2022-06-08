import React, { useState } from "react";
import "./congeEmployee.css";
import CongeModalEmployee from "../../Components/modal/CongeModalEmployee";
import Title from "../../Components/title/Title";
import Postmodal from "../../Components/modal/Postmodal";
export default function CongeEmployee() {
  const [isModalOpened, setIsModalOpened] = useState(false);
  return (
    <>
      <div className="conge d-flex-4">
        <div className="head d-head">
          <Title nomdepage="Dashboard" subname="Congé">
            <button
              onClick={() => {
                setIsModalOpened(true);
              }}
            >
              Faire une demande de congé
            </button>
          </Title>
          {/* MODAL */}
        </div>
      </div>
      <CongeModalEmployee
        isOpened={isModalOpened}
        onClose={() => setIsModalOpened(false)}
      />
    </>
  );
}
