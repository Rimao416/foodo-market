import React, { useState, useEffect } from "react";
import Title from "../../Components/title/Title";
import Select from "../../Components/forms/Select";
import RadialBar from "../../Components/chart/RadialBar";

import Progress from "../../Components/Progress/Progress";
import "./PointageUser.css";
import LineCharts from "../../Components/chart/LineCharts";
import SelectYear from "../../Components/SelectYear/SelectYear";
import axios from "axios";
import moment from "moment";
export default function PointageUser(props) {
  const { id } = props.match.params;
  const [year, setYear] = useState(new Date().getFullYear());
  const [pointage, setPointage] = useState([]);

  useEffect(() => {
    console.log(year);
    axios
      .get(`http://localhost:8000/api/enregistrements/details/${id}/${year}`)
      .then((response) => setPointage(response.data));
  }, [year]);
  const handleChange = (event) => {
    const { value } = event.target;
    setYear(value);
  };
  return (
    <div className="pointageUser d-flex-4 ">
      <div className="head d-head">
        <Title nomdepage="Dashboard" subname="Fiche de Présence">
          {" "}
          KAYUMBA OMARI OMARIS
        </Title>
      </div>
      <pre></pre>
      <div className="header-input">
        <SelectYear handleChange={handleChange} />
      </div>
      <div className="flexAbsence">
        <div className="flex_fiche_absence">
          <div className="container-box">
            <h4>Jours de travail / Jours d'Absence</h4>
            <RadialBar pointage={pointage} year={year} />
          </div>
        </div>
        <div className="flex_fiche_absence">
          <div className="container-box">
            <h4>Jours de travail</h4>
            {pointage.map((p, idx) => (
              <>
                {idx < 5 && (
                  <div className="stats-info">
                    <p>
                      {moment(p.sentAt, "MM-YYYY")
                        .lang("fr")
                        .format("MMMM-YYYY")
                        .toUpperCase()}
                      <strong>{p.jourTravail} Jours</strong>
                    </p>
                    <Progress
                      color={p.jourTravail}
                      mois={p.sentAt}
                      status={"travail"}
                    />
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
        <div className="flex_fiche_absence">
          <div className="container-box">
            <h4>Jours d'absences</h4>
            {pointage.map((p, idx) => (
              <>
                {idx < 5 && (
                  <div className="stats-info">
                    <p>
                      {moment(p.sentAt, "MM-YYYY")
                        .lang("fr")
                        .format("MMMM-YYYY")
                        .toUpperCase()}
                      <strong>{p.jourAbsence} Jours</strong>
                      {/* 1--9 Moyen, 10-15 Bon =, 15-20 */}
                    </p>
                    <Progress
                      color={p.jourAbsence}
                      mois={p.sentAt}
                      status={"absence"}
                    />
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
        <div className="flex_fiche_absence">
          <div className="container-box">
            <h4>Statistique 3</h4>
            <div className="stats-info">
              <LineCharts pointage={pointage} year={year} />
            </div>
          </div>
        </div>
        <div className="flex_fiche_absence">
          <div className="container-box">
            <h4>Statistique 4</h4>
            <div className="stats-info"></div>
          </div>
        </div>
        <div className="flex_fiche_absence">
          <div className="container-box">
            <h4>Statistique 5</h4>
            <div className="stats-info"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
