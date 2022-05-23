import React, { useState } from "react";
import "./pointage.css";
import * as XLSX from "xlsx";
import Title from "../../Components/title/Title";
import PointageModal from "../../Components/modal/PointageModal";
import { Link } from "react-router-dom/cjs/react-router-dom";
import Teletravail from "../Teletravail/Teletravail";
import AlertPointageModal from "../../Components/modal/AlertPointageModal";
import pointageApi from "../../services/pointageApi";
import moment from "moment";
import axios from "axios";
const Pointage = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [items, setItems] = useState({
    pointeAt: "",
    startAt: "",
    endAt: "",
  });
  var remplacer = [];
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");
  var jour = 1;
  var pointagejour = "";
  var mois = "";
  var jourmois = 0;
  const actualYear = new Date().getFullYear(); //2022
  let uniqueChars = [];
  var user = 0;
  const readExcel = (file) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e) => {
      const bufferArray = e.target.result;
      const wb = XLSX.read(bufferArray, { type: "buffer" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      pointageApi.uniqueData(data, uniqueChars);
      mois = pointageApi.getMonth(data); //Obtention du mois actuel
      pointagejour = moment(actualYear + "-" + mois).format("YYYY-MM");
      jourmois = moment(pointagejour, "YYYY-MM").daysInMonth();

      while (user != uniqueChars.length) {
        var temps = 0;
        var total_travail = 0;
        var jour_de_travail = 0;
        console.log("La valeur est" + moment(pointagejour).format("MM"));
        while (jour <= jourmois) {
          remplacer = pointageApi.load_data(
            data,
            moment(pointagejour).format("MM"),
            pointageApi.transform(jour),
            uniqueChars[user]
          );
          if (remplacer.length > 0) {
            console.log(pointageApi.getMomentDate(remplacer, 0));
            if (remplacer.length == 2) {
              axios.post("http://localhost:8000/api/pointages", {
                startAt: remplacer[0]["Date/Temps"].split(" ")[1],
                endAt: remplacer[1]["Date/Temps"].split(" ")[1],
                user: "api/users/129",
                pointeAt: pointageApi.getMomentDate(remplacer, 0),
                status: "PRESENTIEL",
              });
              /*setItems({
                ...items,
                pointeAt: pointageApi.getMomentDate(remplacer, 0),
                startAt: remplacer[0]["Date/Temps"].split(" ")[1],
                endAt: remplacer[1]["Date/Temps"].split(" ")[1],
              });*/
            } else if (remplacer.length == 1) {
              axios.post("http://localhost:8000/api/pointages", {
                startAt: remplacer[0]["Date/Temps"].split(" ")[1],
                endAt: "----",
                user: "api/users/129",
                pointeAt: pointageApi.getMomentDate(remplacer, 0),
                status: "PRESENTIEL",
              });
              setItems({
                ...items,
                pointeAt: "salut",
                startAt: "pourquoi",
                endAt: "dfdsfs",
              });
            }
          }
          console.log("*************************");
          jour++;
        }
        user++;
        jour = 1;
      }
    };
  };
  return (
    <>
      <h1>Tableau {items.length}</h1>
      {items.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Left 1</th>
              <th>Left 2</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i, index) => (
              <tr key={index}>
                <td>i</td>
                <td>2</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="pointage">
        <div className="head">
          <Title nomdepage="Dashboard" subname="Pointage">
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                readExcel(file);
              }}
            />
            <button style={{ color: "white" }}>
              <Link to="/pointage/teletravail/">Télétravail</Link>{" "}
            </button>
          </Title>
        </div>
      </div>
      <AlertPointageModal
        isOpened={isModalOpened}
        onClose={() => setIsModalOpened(false)}
      />
    </>
  );
};
export default Pointage;
