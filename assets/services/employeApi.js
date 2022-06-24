import axios from "axios";
import { EMPLOYES_API } from "../config";
function getUsers() {
  return axios
    .get(EMPLOYES_API)
    .then((response) => response.data);
    // .then((response) => response.data["hydra:member"]);
}

function find(id) {
  return axios.get(EMPLOYES_API + "/" + id).then((response) => response.data);
}
function create(
  Email,
  Password,
  Firstname,
  Lastname,
  Photo,
  Adresse,
  ComeAt,
  Poste
) {
  return axios.post(EMPLOYES_API, {
    email: Email,
    password: Password,
    firstName: Firstname,
    lastName: Lastname,
    photo: Photo,
    adresse: Adresse,
    comeAt: ComeAt,
    poste: `/api/postes/${Poste}`,
  });
}
function update(id, Email, Firstname, Lastname, Adresse, Poste) {
  return axios.put(EMPLOYES_API + "/" + id, {
    email: Email,
    firstName: Firstname,
    lastName: Lastname,
    adresse: Adresse,
    poste: `/api/postes/${Poste}`,
  });
}
function deleteEmploye(id) {
  return axios.delete(EMPLOYES_API + "/" + id);
}

export default {
  find,
  create,
  update,
  getUsers,
  delete: deleteEmploye,
};
