import axios from "axios";
import { TELETRAVAIL_API } from "../config";
function addZero(value) {
    return value + ":00";
  }
function create(debut,fin,utilisateur,pointage){
   return axios.post(TELETRAVAIL_API, {
    startAt: debut,
    endAt: fin,
    user: `api/users/${utilisateur}`,
    pointeAt: pointage,
    status: "DISTANCIEL",
  });
}
function findAll() {
    return axios
      .get(TELETRAVAIL_API)
      .then((response) => response.data["hydra:member"]);
  }
// function create(debut,fin,utilisateur,pointage){
//    return axios.post("http://localhost:8000/api/pointages", {
//     startAt: addZero(debut),
//     endAt: addZero(fin),
//     user: `api/users/${utilisateur}`,
//     pointeAt: pointage,
//     status: "DISTANCIEL",
//   });
// }
export default {
    create,
    findAll
}