import React from "react";

import { FiEdit, FiTrash2 } from "react-icons/fi";
export default function Edit({id,isOpened,onClose,onOpen,setId,type,setType}) {
  return (
    <>
      <div className="operations_users" id={"user"+id}>
        <span className="operations" onClick={()=>{onOpen();setId(id);setType("AJOUTER_EMPLOYE")}}>
          <span className="icons">
            <FiEdit/>
          </span>
          <span className="text">Modifier</span>
        </span>
        <span className="operations" onClick={()=>{onOpen();setId(id);setType("SUPPRIMER_EMPLOYE")}}>
          <span className="icons">
            <FiTrash2 />
          </span>
          <span className="text">Supprimer</span>
        </span>
      </div>
    </>
  );
}
