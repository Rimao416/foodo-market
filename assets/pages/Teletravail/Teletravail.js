import axios from "axios";
import React, { useState } from "react";
import Title from "../../Components/title/Title";
import "./teletravail.css";
export default function Teletravail() {
  const [id, setId] = useState(0);
  const [pointage, setPointage] = useState([
    {
      index: Math.random(),
      pointeAt: "",
      startAt: "",
      endAt: "",
    },
  ]);
  const handleinputchange = (e, index) => {
    const { name, value } = e.target;
    const list = [...pointage];
    list[index][name] = value;
    setPointage(list);
  };
  const handleaddclick = () => {
    setPointage([
      ...pointage,
      { index: Math.random(), pointeAt: "", startAt: "", endAt: "" },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    for (let i = 0; i < pointage.length; i++) {
      const data = axios.post(
        "http://localhost:8000/api/pointages",
        pointage[i]
      );
    }
  };
  const handleremove = (index) => {
    const list = [...pointage];
    list.splice(index, 1);
    setPointage(list);
  };
  const clickOnDelete = (record) => {
    setPointage(pointage.filter((r) => r !== record));
  };

  return (
    <>
      <div className="Teletravail d-flex-4">
        <div className="head d-head">
          <Title nomdepage="Dashboard" subname="Pointage">
            {" "}
            <button onClick={handleaddclick}>Ajouter une date</button>
          </Title>
          <pre></pre>
          <form className="formulaire" onSubmit={handleSubmit}>
            {pointage.map((p, index) => (
              <div key={index}>
                <div className="form-grap">
                  <div className="form-group">
                    <label htmlFor="firstName" className="label-input">
                      Date du télétravail
                    </label>
                    <input
                      type="date"
                      placeholder="ex. Mariem"
                      name="pointeAt"
                      data-id={index}
                      defaultValue={p.date}
                      onChange={(e) => handleinputchange(e, index)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName" className="label-input">
                      Heure de début
                    </label>
                    <input
                      type="time"
                      placeholder="ex. Omari"
                      name="startAt"
                      data-id={index}
                      defaultValue={p.startAt}
                      onChange={(e) => handleinputchange(e, index)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName" className="label-input">
                      Heure de Fin
                    </label>
                    <input
                      type="time"
                      name="endAt"
                      data-id={index}
                      defaultValue={p.endAt}
                      onChange={(e) => handleinputchange(e, index)}
                    />
                  </div>
                  <div className="form-group">
                    <div className="form-group-button">
                      {pointage.length - 1 === index && (
                        <button onClick={() => handleremove(index)}>
                          Annuler
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="submit-section">
              <button className="form-first " type="submit">
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
