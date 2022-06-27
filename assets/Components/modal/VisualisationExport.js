import React, { useState } from "react";
import { BiX } from "react-icons/bi";
import { createPortal } from "react-dom";
import * as XLSX from "xlsx";
import Select from "../forms/Select";
import moment from "moment";
const VisualisationExport = ({
  isExport,
  onCloseExport,
  dateGroup,
  yearMonth,
}) => {
  const makeReport = () => {
    var el = document.getElementById("rapport");
    var wb = XLSX.utils.table_to_book(el, { sheet: "sheet1" });
    return XLSX.writeFile(wb, "sheet.xlsx");
  };

  if (!isExport) {
    return null;
  }
  //   const [date,setDate]=useState('')

  //   const handleSubmit=(event)=>{
  //     event.preventDefault()
  //     console.log(date);
  //     // ICI REQUETE

  //   }
  return createPortal(
    <div className="overlay">
      <div className="modal">
        <span id="cross">
          <BiX
            onClick={() => {
              onCloseExport();
            }}
          />
        </span>
        <div className="modal-header">
          <h5 className="modal-title">
            {/* Exportation de {moment(d.sentAt).lang("fr").format("MMMM-YYYY")} */}{" "}
          EXPORTATION DE {moment(yearMonth,'MM-YYYY').lang('fr').format('MMMM-YYYY').toUpperCase()}
          </h5>
        </div>
        <div className="modal-body">
          <table id="rapport">
            <thead>
              <tr>
                <th>Employée</th>
                <th>Poste</th>
                <th>Jour de travail</th>
                <th>Jour d'absence</th>
                <th>Heure Supp</th>
                <th>Heure Retard</th>
              </tr>
            </thead>
            <tbody>
              {dateGroup.length > 0 &&
                dateGroup.map((d) => (
                  <tr key={d.id}>
                    <td>
                      {d.matricule.firstName + " " + d.matricule.lastName}
                    </td>
                    <td> {d.matricule.poste.Designation}</td>
                    <td>{d.jourTravail}</td>
                    <td>{d.jourAbsence}</td>
                    <td>{d.heureSupp}</td>
                    <td>{d.heureRetard}</td>
                  </tr>
                ))}
            </tbody>
          </table>

          <pre></pre>
          <div className="form-flex-button">
            <button className="btn-info" onClick={() => makeReport()}>
              Exporter
            </button>
            <button className="btn-danger" onClick={() => onCloseExport()}>
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default VisualisationExport;
