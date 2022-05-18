import axios from "axios";
function find(id){
    return axios
    .get("http://localhost:8000/api/users/" + id)
    .then((response) => response.data);
}
function create(Email,Password,Firstname,Lastname,Photo,Adresse,ComeAt,Poste){
    return axios.post("http://localhost:8000/api/users", {
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
function update(id,Email,Firstname,Lastname,Photo,Adresse,Poste){
    return axios.put(
        "http://localhost:8000/api/users/" + id,
        {
          email: Email,
          firstName: Firstname,
          lastName: Lastname,
          photo: Photo,
          adresse: Adresse,
          poste: `/api/postes/${Poste}`,
        }
      );
}
function deleteEmploye(id){
    return axios.delete(
        "http://localhost:8000/api/users/" + id
      );
}

export default {
    find,
    create,
    update,
    delete:deleteEmploye
}