import React from "react";
import "./popupAlert.css";

const PopupAlert = (props) => {
  console.log(props);
  return <div className="textName">{props.popUpText}</div>;
};

export default PopupAlert;
