import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import { JOUR_API, POINTAGE_API } from "../config";
const uniqueData = (table, unique) => {
  table.forEach((c) => {
    if (!unique.includes(c["Matricule"])) {
      unique.push(c["Matricule"]);
    }
  });
  return unique;
};
const getMonth = (data) => {
  return data[0]["Date/Temps"].split("/")[1];
};
const load_data = (data, mois, jour, id) => {
  const filtre = data
    .filter((f) => f["Date/Temps"].split(" ")[0].split("/")[1] == mois)
    .filter((fJour) => fJour["Date/Temps"].split(" ")[0].split("/")[0] == jour)
    .filter((fDay) => fDay["Matricule"] === id);
  return filtre;
};
const transform = (value) => {
  if (value < 10) {
    return "0" + value;
  } else {
    return value;
  }
};
const getDateData = (table, indice) => {
  return table[indice]["Date/Temps"].split(" ")[0] === undefined ? "0" : "1";
};
const getMomentDate = (table, index) => {
  return moment(table[index]["Date/Temps"].split(" ")[0], "DD/MM/YYYY").format(
    "YYYY-MM-DD"
  );
};
const momentjs = (value) => {
  return "-" + value;
};
const isHoliday = (month, year, nombre_des_jours) => {
  var i = 1;
  var jour_ferie = 0;
  var jour = 0;
  while (i <= nombre_des_jours) {
    jour = moment(year + momentjs(month) + momentjs(transform(i)));
    if (jour.day() == 0 || jour.day() == 6) {
      jour_ferie++;
    }

    i++;
  }
  //  return jour_ferie
  return jour_ferie;
};
var getDataHolidays = async function () {
  try {
    return await axios
      .get(JOUR_API)
      .then((response) => response.data["hydra:member"]);
  } catch (error) {}
}; /*

const ferie = async () => {
  console.log(await getDataHolidays());
};*/
function convertTime(num) {
  var hours = Math.floor(num / 3600);

  var minutes = Math.floor((num % 3600) / 60);
  var secondes = Math.floor((num % 3600) % 60);
  return hours + ":" + minutes + ":" + secondes;
}
function create(Matricule, Travail, Absence, Supp, Retard) {
  return axios.post(POINTAGE_API, {
    matricule: parseInt(Matricule),
    jourTravail: parseInt(Travail),
    jourAbsence: parseInt(Absence),
    heureSupp: parseInt(Supp),
    heureRetard: parseInt(Retard),
  });
}
function returnId(matricule, tables) {
  let data;
  data = tables.filter((f) => f.matricule == matricule);

  return data.length > 0 ? data[0].id: 0;
}

export default {
  uniqueData,
  getMonth,
  load_data,
  transform,
  momentjs,
  getDateData,
  getMomentDate,
  isHoliday,
  getDataHolidays,
  convertTime,
  create,
  returnId,
};
