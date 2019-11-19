import React from "react";
import "./style.css";

export function Box({ children, location }) {
  var box;
  if (location === "signin") {
    box = "modal-content";
  } else if (location === "profile") {
    box = "profile-box box-common";
  } else if (location === "ngo") {
    box = "ngo-box box-common";
  } else if (location === "employee") {
    box = "employee-box box-common";
  } else if (location === "add") {
    box = "add-box box-common";
  }
  return <div className={box}>{children}</div>;
}

export function ProfileBox(props) {
  return (
    <div className="box-heading profile-content">
      <div>
        <img
          className="img-fluid profile-image"
          src={props.userPicture}
          alt={props.userName}
        />
        <h4>@{props.userName}</h4>
      </div>
      <div className="profile-extras">
        <p>{props.userEmail}</p>
        <p>Total Employees: {props.employee.length}</p>
        <p>Total NGOs: {props.ngo.length}</p>
      </div>
    </div>
  );
}

export function NGOBox(props) {
  return (
    <div className="ngo-content">
      <h2 className="box-heading">NGO</h2>
      <div className="ngo-content-div">
        {props.ngo.map((item, i) => (
          <div className="ngo-content-info" key={i}>
            <div>
              <h5 className="ngo-box-name">{item.name}</h5>
              <p className="ngo-box-purpose">{item.purpose}</p>
            </div>
            <div>
              <button onClick={() => props.handleNGODelete(item._id)} className="btn btn-dark ml-3">X</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export function EmployeeBox(props) {
  return (
    <div className="employee-content">
      <h2 className="box-heading">Employee</h2>
      <div className="employee-content-div">
        {props.employee.map((item, i) => (
          <button
            className="employee-button"
            key={i}
            id={item._id}
            onClick={props.handleShow}
          >
            <h5 id={item._id}>{item.name}</h5>
            <p id={item._id}>Contributed: ${item.contribution}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
