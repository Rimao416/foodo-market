import React, { useState, useEffect } from "react";
import "./pointage.css";
import * as XLSX from "xlsx";
import Title from "../../Components/title/Title";
import PointageModal from "../../Components/modal/PointageModal";
import { Link } from "react-router-dom/cjs/react-router-dom";
import VisualisationExport from "../../Components/modal/VisualisationExport";
import AlertPointageModal from "../../Components/modal/AlertPointageModal";
import pointageApi from "../../services/pointageApi";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";
import ferieApi from "../../services/ferieApi";
import TeletravailApi from "../../services/TeletravailApi";
const Pointage = () => {
  const [search, setSearch] = useState({
    noms: "",
    mois: "",
    annee: new Date().getFullYear(),
  });
  const [isDocumentLoaded, setIsDocumentLoaded] = useState(false);
  const [output, setOutput] = useState([]);
  const [employes, setEmploye] = useState([]);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [exportModal, setExportModal] = useState(false);
  const [pointages, setPointages] = useState([]);
  const [dateGroup, setDateGroup] = useState([]);
  const [yearMonth,setYearMonth]=useState('')
  var moi = {};
  const [items, setItems] = useState({
    pointeAt: "",
    startAt: "",
    endAt: "",
    user: "",
  });
  let repos = "";
  let teletravail = [];
  const ajoutPointage = async () => {
    for (let k = 0; k < output.length; k++) {
      try {
        await axios.post("http://localhost:8000/api/enregistrements", {
          matricule: `/api/users/${pointageApi.returnId(
            output[k].id,
            employes
          )}`,
          jourTravail: output[k].travail,
          jourAbsence: output[k].absence,
          heureSupp: output[k].heure_supp,
          heureRetard: output[k].heure_retard,
          // matricule: `/api/users/${pointageApi.returnId(
          //   output[k].id,
          //   employes
          // )}`,
          sentAt: "04-2022",
        });
      } catch (error) {
        toast.error("ERREUR LORS DE L'AJOUT");
      }
    }
  };

  const fetchEmployes = async () => {
    try {
      const data = await axios
        .get("http://localhost:8000/api/users")
        .then((response) => response.data);
      setEmploye(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const fetchRepos = async () => {
    try {
      const data = await ferieApi.findAllDay();
      data.map((r) => {
        repos.push(moment(r["startAt"]).format("YYYY-MM-DD"));
      });
    } catch (error) {
      console.log(error.response);
    }
  };
  const fetchTeletravail = async () => {
    try {
      const data = await TeletravailApi.findAll();
      data.map((r) => {
        teletravail.push({
          matricule: r.matricule,
          startAt: r.startAt,
          endAt: r.endAt,
          pointeAt: moment(r.pointeAt).format("DD/MM/YYYY"),
        });
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    if (isDocumentLoaded == true) {
      fetchRepos();
    }
    //
  }, [isDocumentLoaded]);
  useEffect(() => {
    if (isDocumentLoaded == true) {
      fetchTeletravail();
    }
  }, [isDocumentLoaded]);
  useEffect(() => {
    if (isDocumentLoaded == true) {
      fetchEmployes();
    }
  }, [isDocumentLoaded]);
  const fetchData = async () => {
    const data = await axios
      .get("http://localhost:8000/api/enregistrements")
      .then((response) => response.data);
    console.log(data);
    setPointages(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (employes.length > 0) {
      ajoutPointage();
    }
  }, [employes]);

  useEffect(() => {
    if (dateGroup.length != 0) {
      console.log(dateGroup);
    }
  }, [dateGroup]);
  var remplacer = [];
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");
  var jour = 1;
  var pointagejour = "";
  var mois = "";
  var jourmois = 0;
  var notification = 0;
  var tempsUser = 0;
  const actualYear = new Date().getFullYear(); //2022
  var somme_retard = 0;
  let uniqueChars = [];
  var user = 0;
  var non_pointage = 0;
  const readExcel = (file) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e) => {
      const bufferArray = e.target.result;
      const wb = XLSX.read(bufferArray, { type: "buffer" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      var data = XLSX.utils.sheet_to_json(ws);
      setIsDocumentLoaded(true);
      console.log(data);
      for (let j = 0; j < teletravail.length; j++) {
        data.push({
          Matricule: teletravail[j].matricule.toString(),
          "Date/Temps": teletravail[j].pointeAt + " " + teletravail[j].startAt,
        });
        data.push({
          Matricule: teletravail[j].matricule.toString(),
          "Date/Temps": teletravail[j].pointeAt + " " + teletravail[j].endAt,
        });
      }
      console.log(data);
      pointageApi.uniqueData(data, uniqueChars);
      mois = pointageApi.getMonth(data); //Obtention du mois actuel
      pointagejour = moment(actualYear + "-" + mois).format("YYYY-MM");
      jourmois = moment(pointagejour, "YYYY-MM").daysInMonth();
      //const JOURFERIE = pointageApi.isHoliday(mois, actualYear, jourmois);
      var jourFerie = 0;

      while (user != uniqueChars.length) {
        var total_travail = 0;
        var jour_de_travail = 0;
        // console.log("La valeur est" + moment(pointagejour).format("MM"));
        while (jour <= jourmois) {
          pointageApi
            .load_data(
              data,
              moment(pointagejour).format("MM"),
              pointageApi.transform(jour),
              uniqueChars[user]
            )
            .forEach((retour) => {
              const tempsPointage = retour["Date/Temps"].split(" ")[1];
              var [Hours, Minutes, Secondes] = tempsPointage.split(":");
              Hours = Hours * 3600;
              Minutes = Minutes * 60;
              notification++;
              const tempsFinal =
                parseInt(Hours) + parseInt(Minutes) + parseInt(Secondes);
              if (notification == 1) {
                somme_retard = tempsFinal;
              }
              tempsUser = Math.abs(Math.abs(tempsUser) - tempsFinal);
            });
          //  console.log("Le temps user est "+tempsUser);
          //VERIFICATION SI C'EST UN JOUR FERIE
          var day = moment(
            actualYear + pointageApi.momentjs(mois) + pointageApi.momentjs(jour)
          );
          if (repos.includes(day.format("YYYY-MM-DD"))) {
            if (day.day() != 0 && day.day() != 6) {
              //JOURFERIE++
              jourFerie++;
            }
          }
          //SUITE D'OPERATION
          if (notification > 1) {
            total_travail += tempsUser;
            jour_de_travail++;
            //
            //
          } else if (notification == 1) {
            non_pointage++;
          }

          tempsUser = 0;
          notification = 0;
          console.log("*************************");
          jour++;
        }
        jourFerie =
          jourFerie + pointageApi.isHoliday(mois, actualYear, jourmois);
        const RESULTAT_TRAVAIL =
          Math.round(total_travail - jour_de_travail * 3600) / 3600;
        const TRAVAIL = Math.round(RESULTAT_TRAVAIL / 8);
        const TRAVAILENTREPRISE = (jourmois - jourFerie) * 8;
        output.push({
          id: uniqueChars[user],
          travail: TRAVAIL,
          notification: non_pointage,
          absence: jourmois - TRAVAIL - jourFerie,
          heure_supp: Math.floor(
            Math.floor((total_travail - jour_de_travail * 3600) / 3600) -
              TRAVAILENTREPRISE
          ),
          heure_retard: Math.floor(
            TRAVAILENTREPRISE -
              Math.floor((total_travail - jour_de_travail * 3600) / 3600)
          ),
        });
        user++;
        non_pointage = 0;
        jour = 1;
        jourFerie = 0;
      }
      setOutput(output);

      toast.success(
        "Le données sont dans la base de donnée et sont prêtes à être exportées"
      );
    };
  };
  const handleSearch = (event) => {
    const { value, name } = event.currentTarget;
    setSearch({ ...search, [name]: value });
  };
  const filteredPointage = pointages.filter(
    (p) =>
      p.matricule.firstName.toLowerCase().includes(search.noms.toLowerCase()) &&
      p.sentAt.includes(search.annee)
  );
  return (
    <>
      <div className="pointage">
        <div className="head">
          <Title nomdepage="Dashboard" subname="Pointage">
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                readExcel(file);
              }}
            />
            <button style={{ color: "white" }}>
              <Link to="/pointage/teletravail/">Télétravail</Link>{" "}
            </button>
            <button
              style={{ color: "white" }}
              onClick={() => setIsModalOpened(true)}
            >
              Exporter
            </button>
          </Title>
          <pre></pre>
          <div className="header-input">
            <input
              type="text"
              placeholder="Entrez le nom de l'employé"
              value={search.noms}
              name="noms"
              onChange={handleSearch}
            />
            <input
              type="text"
              placeholder="Entrez une date ex:01-2022 ou 2022"
              value={search.annee}
              name="annee"
              onChange={handleSearch}
            />
          </div>

          <table>
            <thead>
              <tr>
                <th>Employée</th>
                <th>Poste</th>
                <th>Jour de travail</th>
                <th>Mois-Année</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPointage.length > 0 &&
                filteredPointage.map((p) => (
                  <tr key={p.id}>
                    <td>
                      {p.matricule.firstName} | {p.matricule.lastName}
                    </td>
                    <td>{p.matricule.poste.Designation}</td>
                    <td>{p.jourTravail} Jours</td>
                    <td>
                      {moment(p.sentAt, "MM-YYYY")
                        .lang("fr")
                        .format("MMMM-YYYY")}
                    </td>
                    <td>
                      <div className="form-group-button">
                        <button>
                          {" "}
                          <Link to={`/pointage/user/${p.matricule.id}`}>
                            Voir Plus
                          </Link>{" "}
                        </button>
                      </div>
                      <span></span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <AlertPointageModal
        isOpened={isModalOpened}
        onClose={() => setIsModalOpened(false)}
        dateGroup={dateGroup}
        setDateGroup={setDateGroup}
        // isExport={exportModal}
        onOpenExport={()=>setExportModal(true)}
        setYearMonth={setYearMonth}
      />
      <VisualisationExport
        isExport={exportModal}
        onCloseExport={() => setExportModal(false)}
        dateGroup={dateGroup}
        yearMonth={yearMonth}
      />
    </>
  );
};
export default Pointage;
