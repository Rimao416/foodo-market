import moment from "moment";
import React from "react";
import "./Progress.css";
const ColorValue = (value,status) => {
  if(status=='travail'){

  
  if (value < 9) {
    return "#f62d51";
  } else if (value > 10 && value < 15) {
    return "#ffbc34";
  } else if (value >= 15) {
    return "#55ce63";
  }
}else if(status=='absence'){
  if(value < 5){
    return "#55ce63"
  }else if(value >=5 && value <10){
    return "#ffbc34"
  }else if (value >= 10) {
    return "#f62d51";
  }
}
};

const setProgress=(status)=>{
  if(status=='travail'){
    return <></>
  }
}
function getPourcentage(month, day) {
  // const mois=month.split('-')
  return Math.round((day * 100) / parseInt(moment(month, "MM-YYYY").daysInMonth()));
}
export default function Progress({ color, mois,status }) {
  return (
    <div className="progress">
      <div
        className="progress-done"
        style={{ backgroundColor: ColorValue(color,status), width: `${getPourcentage(mois,color)}%` }}
        data-done="100"
      ></div>
    </div>
  );
}
