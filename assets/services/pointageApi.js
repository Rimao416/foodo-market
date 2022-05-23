import moment from "moment";

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

export default {
  uniqueData,
  getMonth,
  load_data,
  transform,
  getDateData,
  getMomentDate,
};
