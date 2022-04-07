import React from "react";
import { HiDotsVertical } from "react-icons/hi";

import Edit from "./sub_card/Edit";
import "./usercard.css";
const Usercard = () => {
  function changeValue() {
    document.querySelector(".card_user").classList.toggle("active");
    document.querySelector(".operations_users").classList.toggle("hide");
  }
  return (
    <>
      <div className="card_user">
        <span className="dot" onClick={() => changeValue()}>
          <HiDotsVertical />
        </span>
        <div className="profile_user">
          <img
            src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>

        <div className="user_details">
          <div className="card">
            <h4>Mariem FoodoMarket</h4>
            <h5>Web Developper</h5>
          </div>
        </div>
        <Edit />
      </div>
    </>
  );
};

export default Usercard;
