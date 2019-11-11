import React from "react";
import "./style.css";

export function Background({ children, page }) {
  var classname
  page === "signin" ? classname = "before-signin" : classname = "after-signin";
  
  return <div className={classname}>{children}</div>;
}

export function Navbar({ children}) {
  return <div className="navbar gradient">{children}</div>;
}


