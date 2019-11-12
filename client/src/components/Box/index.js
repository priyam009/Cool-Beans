import React from "react";
import "./style.css";

export function Box({ children, location }) {
  var box;
  if(location==="signin") {
    box = "modal-content";
  } else if(location === "profile") {
    box = "profile-box box-common"
  } else if(location === "ngo") {
    box = "ngo-box box-common"
  } else if(location === "employee") {
    box = "employee-box box-common"
  }
  return <div className={box}>{children}</div>;
}