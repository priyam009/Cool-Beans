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

export function SigninGoogle() {
  return <div class="g-signin2" data-onsuccess="onSignIn"></div>;
}
