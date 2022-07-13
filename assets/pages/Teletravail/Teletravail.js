import axios from "axios";
import React, { useState, useEffect } from "react";
import Title from "../../Components/title/Title";
import employeApi from "../../services/employeApi";
import Select from "../../Components/forms/Select";
import "./teletravail.css";
import { toast } from "react-toastify";
export default function Teletravail() {
  const [userId, setUserId] = useState(0);
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    const data = await employeApi.getUsers();
    setUsers(data);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const [id, setId] = useState(0);
  const [pointage, setPointage] = useState([
    {
      index: Math.random(),
      pointeAt: "",
      startAt: "",
      endAt: "",
    },
  ]);
  const [user, setUser] = useState([]);
  function addZero(value) {
    return value + ":00";
  }
  const handleinputchange = (e, index) => {
    const { name, value } = e.target;
    const list = [...pointage];
    list[index][name] = value;
    setPointage(list);
  };
  const handleChange = (event) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;
    setId(value);
    //    setUser({ ...user, [name]: value });
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleaddclick = () => {
    setPointage([
      ...pointage,
      { index: Math.random(), pointeAt: "", startAt: "", endAt: "" },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const chaine="Moi"
    // console.log(chaine);
    // var user_id = parseInt(
    //   JSON.stringify(user)
    //     .split(":")[1]
    //     .replaceAll('"', "")
    //     .replace("}", "")
    //     .trim()
    // );
    // console.log(pointage);
    for (let i = 0; i < pointage.length; i++) {
      try {
        console.log(users);
        const data = await axios.post("http://localhost:8000/api/pointages", {
          startAt: addZero(pointage[i].startAt),
          endAt: addZero(pointage[i].endAt),
          pointeAt: pointage[i].pointeAt,
          status: "DISTANCIEL",
          matricule: parseInt(id),
        });
        toast.success("Information ajouté avec succès")
        if(i==pointage.length -1){
          toast.info("Tous les informations ont été ajoutés")
        }
        // const data = await TeletravailApi.create(
        //   addZero(pointage[i].startAt),
        //   addZero(pointage[i].endAt),
        //   user_id,
        //   pointage[i].pointeAt,
        // );
      } catch (error) {
        toast.info("Erreur lors de l'ajout");
      }
    }
  };
  const handleremove = (index) => {
    const list = [...pointage];
    list.splice(index, 1);
    setPointage(list);
  };
  const clickOnDelete = (record) => {
    setPointage(pointage.filter((r) => r !== record));
  };

  return (
    <>
      <div className="Teletravail d-flex-4">
        <div className="head d-head">
          <Title nomdepage="Dashboard" subname="Pointage">
            {" "}
            <button onClick={handleaddclick}>Ajouter une date</button>
          </Title>
          <pre></pre>

          <form className="formulaire" onSubmit={handleSubmit}>
            <div className="userChoose">
              <Select
                name="user"
                label="Choisissez l'utilisateur"
                // value={poste.departement}
                onChange={handleChange}
              >
                <option value="" required>
                  --------------------------------
                </option>
                {users.map((user) => (
                  <>
                    {user.roles.includes("ROLE_EMPLOYE") && (
                      <option key={user.id} value={user.matricule}>
                        {user.firstName}
                      </option>
                    )}
                  </>
                ))}
              </Select>
            </div>
            {pointage.map((p, index) => (
              <div key={index}>
                <div className="form-grap">
                  <div className="form-group">
                    <label htmlFor="firstName" className="label-input">
                      Date du télétravail
                    </label>
                    <input
                      type="date"
                      placeholder="ex. Mariem"
                      name="pointeAt"
                      data-id={index}
                      defaultValue={p.date}
                      required
                      onChange={(e) => handleinputchange(e, index)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName" className="label-input">
                      Heure de début
                    </label>
                    <input
                      type="time"
                      placeholder="ex. Omari"
                      name="startAt"
                      data-id={index}
                      defaultValue={p.startAt}
                      onChange={(e) => handleinputchange(e, index)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName" className="label-input">
                      Heure de Fin
                    </label>
                    <input
                      type="time"
                      name="endAt"
                      data-id={index}
                      defaultValue={p.endAt}
                      required
                      onChange={(e) => handleinputchange(e, index)}
                    />
                  </div>
                  <div className="form-group">
                    <div className="form-group-button">
                      {pointage.length - 1 === index && (
                        <button onClick={() => handleremove(index)}>
                          Annuler
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="submit-section">
              <button className="form-first " type="submit">
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
