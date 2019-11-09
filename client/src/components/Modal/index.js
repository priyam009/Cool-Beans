import React from "react";
import "./style.css";

export function Modal({ children }) {
  return <div className="modal-content">{children}</div>;
}