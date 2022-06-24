import React from "react";
import { HiDotsVertical } from "react-icons/hi";

import Edit from "./sub_card/Edit";
import "./usercard.css";
const Usercard = ({
  id,
  adresse,
  nom,
  prenom,
  photo,
  poste,
  venu,
  isOpened,
  onClose,
  onOpen,
  setId,
  type,
  setType
}) => {
  function changeValue(id) {
    document.querySelector(`.card_user#user${id}`).classList.toggle("active");
    document
      .querySelector(`.operations_users#user${id}`)
      .classList.toggle("hide");
  }
  return (
    <>
      <div className="card_user" id={"user" + id}>
        <span className="dot" onClick={() => changeValue(id)}>
          {/* <HiDotsVertical /> */}
        </span>
        <div className="profile_user">
          <img src={photo} alt="" />
        </div>

        <div className="user_details">
          <div className="card">
            <h4>
              {nom} {prenom}
            </h4>
            <h5>{poste}</h5>
          </div>
        </div>
        <Edit
          id={id}
          isOpened={isOpened}
          onClose={onClose}
          onOpen={onOpen}
          setId={setId}
          type={type}
          setType={setType}
        />
      </div>
    </>
  );
};

export default Usercard;
