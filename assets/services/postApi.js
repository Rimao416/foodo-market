import axios from "axios";
import { POSTES_API,DEPARTEMENTS_API } from "../config";
function findAll() {
  return axios
    .get(POSTES_API)
    .then((response) => response.data);
}
function deletePoste(id) {
  return axios.delete(POSTES_API+"/"+ id);
}
function findOneById(id){
  return axios.get(DEPARTEMENTS_API+"/"+id+"/postes")
  .then((response)=>response.data["hydra:member"])
}

function find(id) {
  return axios
    .get(POSTES_API+"/"+ id)
    .then((response) => response.data);
}
function update(id, designation, departement) {
  return axios.put(POSTES_API+"/"+ id, {
    Designation: designation,
    departement: `/api/departements/${departement}`,
  });
}
function create(designation, departement) {
  return axios.post(POSTES_API, {
    Designation: designation,
    departement: `/api/departements/${departement}`,
  });
}

export default {
  findAll,
  find,
  findOneById,
  update,
  create,
  delete: deletePoste,
};
