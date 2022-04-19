import React from "react";
import Ajouterdep from "../forms/Ajouterdep";
const check_modal = (term) => {
  if (term == "AJOUTER_DEPARTEMENT" || term == "MODIFIER_DEPARTEMENT") {
    return (
      <Ajouterdep
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        errors={errors}
        departement={departement}
      />
    );
  } else if (term == "Azer") {
    return "fdjlkfjsdlk";
  }
};
export default check_modal;
