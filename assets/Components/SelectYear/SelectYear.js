import React, { useState } from "react";
import moment from "moment";
import Select from "../forms/Select";
const SelectYear = ({ handleChange }) => {
  const mYyear = parseInt(new Date().getFullYear()) + 1;
  //   const [yearMap,setYearMap]=useState([])
  let yearMap = [];
  for (let i = 1; i <= 10; i++) {
    yearMap.push(mYyear - i);
  }

  return (
    <>
      <Select name="year" onChange={handleChange}>
        {yearMap.map((y) => (
          <option value={y}>{y}</option>
        ))}
      </Select>
    </>
  );
};

export default SelectYear;
