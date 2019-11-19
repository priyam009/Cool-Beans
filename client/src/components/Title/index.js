import React from "react";
import "./style.css";

export function Title(props) {
  return <div className="title">{props.title}</div>;
}

export function CurrentTitle(props) {
  return (
    <div className="add-content-button">
      <div
        className={
          props.active === "employee" ? "active-gradient" : "inactive-gradient"
        }
        onClick={() => props.handleActiveState("employee")}
      >
        ADD EMPLOYEE
      </div>
      <div
        className={
          props.active === "ngo" ? "active-gradient" : "inactive-gradient"
        }
        onClick={() => props.handleActiveState("ngo")}
      >
        ADD NGO
      </div>
    </div>
  );
}
