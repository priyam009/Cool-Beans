import React from "react";
import "./style.css";

export function Background({ children, page }) {
  return <div className={`background-content ${page}-modal`}>{children}</div>;
}

export function Modal({ children }) {
  return <div className="modal-content">{children}</div>;
}

export function Logo() {
  return <div className="logo">Cool Beans</div>;
}

export function SigninGoogle(props) {
  return (
    <a href={props.url}>
      <button>Sign-in with Google</button>
    </a>
  );
}
