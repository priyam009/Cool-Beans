import React from "react";
import "./style.css";

export function Spinner(props) {
  return (
    <div className={props.loading ? "lds-ellipsis" : ""}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
