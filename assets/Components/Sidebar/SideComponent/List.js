import React from "react";
import { Link } from "react-router-dom";
const List = ({ classname, link, goTo }) => {
  return (
    <>
      <Link to={goTo} className="link">
        <li className={classname}>{link}</li>
      </Link>
    </>
  );
};

export default List;
