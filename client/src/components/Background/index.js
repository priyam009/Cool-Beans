import React from "react";
import "./style.css";

export function Background({ children, page }) {
  return <div className={`background-content ${page}-modal`}>{children}</div>;
}


