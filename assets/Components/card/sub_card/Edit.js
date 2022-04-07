import React from "react";
import "./edit.css";
import { FiEdit, FiTrash2 } from "react-icons/fi";
export default function Edit() {
  return (
    <>
      <div className="operations_users">
        <span className="operations">
          <span className="icons">
            <FiEdit />
          </span>
          <span className="text">Modifier</span>
        </span>
        <span className="operations">
          <span className="icons">
            <FiTrash2 />
          </span>
          <span className="text">Supprimer</span>
        </span>
      </div>
    </>
  );
}
