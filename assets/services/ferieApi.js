import axios from "axios";
import { JOUR_API,REPOS_API } from "../config";
function find(id) {
  return axios
    .get(REPOS_API+"/"+ id)
    .then((response) => response.data);
}
function findAll() {
  return axios
    .get(REPOS_API)
    .then((response) => response.data["hydra:member"]);
}
function findAllDay(){
  return axios
  .get(JOUR_API)
  .then((response) => response.data["hydra:member"]);
}

function update(id, conge) {
  return axios
    .put(REPOS_API+"/"+id, conge)
    .then((response) => response.data);
}
function deleteFerie(id) {
  return axios
    .delete(REPOS_API+"/"+id+"/delete")
    .then((response) => response.data);
}
function createJour(day, id) {
  return axios.post(JOUR_API, {
    startAt: day,
    repos: `api/repos/${id}`,
  });
}
function createRepos(conge) {
  return axios
    .post(REPOS_API, conge)
    .then((response) => response.data);
}
function deleteRepos(id) {
  return axios.delete(REPOS_API+"/"+id);
}

export default {
  find,
  findAll,
  update,
  createJour,
  deleteFerie,
  createRepos,
  deleteRepos,
  findAllDay
};
