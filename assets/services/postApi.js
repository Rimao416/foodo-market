import axios from "axios";
function findAll() {
  return axios
    .get("http://localhost:8000/api/postes")
    .then((response) => response.data["hydra:member"]);
}
function deletePoste(id) {
  return axios.delete("http://localhost:8000/api/postes/" + id);
}
function findOneById(id){
  return axios.get(`http://localhost:8000/api/departements/${id}/postes`)
  .then((response)=>response.data["hydra:member"])
}

function find(id) {
  return axios
    .get("http://localhost:8000/api/postes/" + id)
    .then((response) => response.data);
}
function update(id, designation, departement) {
  return axios.put("http://localhost:8000/api/postes/" + id, {
    Designation: designation,
    departement: `/api/departements/${departement}`,
  });
}
function create(designation, departement) {
  return axios.post("http://localhost:8000/api/postes", {
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
