import React from "react";
import Title from "../../Components/title/Title";
import Select from "../../Components/forms/Select";
export default function PointageUser() {
  return (
    <div className="pointageUser d-flex-4 ">
      <div className="head d-head">
        <Title nomdepage="Dashboard" subname="Fiche de Présence">
          {" "}
          KAYUMBA OMARI OMARIS
        </Title>
      </div>
      <pre></pre>
      <div className="header-input">
        <Select name="Choisissez un mois">
          <option value="01">Janvier</option>
          <option value="02">Janvier</option>
          <option value="03">Janvier</option>
          <option value="04">Janvier</option>
          <option value="05">Janvier</option>
          <option value="06">Janvier</option>
          <option value="07">Janvier</option>
          <option value="08">Janvier</option>
          <option value="09">Janvier</option>
          <option value="10">Janvier</option>
          <option value="11">Janvier</option>
          <option value="12">Janvier</option>
        </Select>
        <Select name="Choisissez une année">
          <option value="2022">Zopba</option>
          <option value="2022">Zopba</option>
          <option value="2022">Zopba</option>
          <option value="2022">Zopba</option>
          <option value="2022">Zopba</option>
          <option value="2022">Zopba</option>
        </Select>
      </div>
      <div className="flexAbsence">
        <div className="flex_fiche_absence"></div>
      </div>
    </div>
  );
}
