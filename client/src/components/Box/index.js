import React from "react";
import "./style.css";

export function Box({ children, location }) {
  var box;
  if(location==="signin") {
    box = "modal-content";
  } else if(location === "profile") {
    box = "profile-box"
  } else if(location === "ngo") {
    box = "ngo-box"
  } else if(location === "employee") {
    box = "employee-box"
  }
  return <div className={box}>{children}</div>;
}