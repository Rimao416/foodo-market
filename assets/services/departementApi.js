import axios from "axios";
function findAll() {
  return axios
    .get("http://localhost:8000/api/departements")
    .then((response) => response.data["hydra:member"]);
}
function deleteDepartement(id) {
  return axios.delete("http://localhost:8000/api/departements/" + id);
}
function find(id) {
  return axios
    .get(`http://localhost:8000/api/departements/` + id)
    .then((response) => response.data);
}
function update(id, departement) {
  return axios.put("http://localhost:8000/api/departements/" + id, departement);
}
function create(departement) {
  return axios.post("http://localhost:8000/api/departements", departement);
}

export default {
  findAll,
  find,
  update,
  create,
  delete: deleteDepartement,
};
