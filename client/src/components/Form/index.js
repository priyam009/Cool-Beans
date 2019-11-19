import React from "react";
import "./style.css";

export function Form({ children }) {
  return <form className="add-form">{children}</form>;
}
export function NGOForm(props) {
  return (
    <>
      <div className="form-details">
        <div className="form-details-div">
          <label>Enter Name:</label>
          <input
            value={props.name}
            name="ngoName"
            onChange={event => props.handleInputChange(event)}
            type="text"
            placeholder="(Required)"
          />
        </div>
        <div className="form-details-div add-margin">
          <label>Enter Purpose:</label>
          <textarea
            value={props.purpose}
            name="ngoPurpose"
            onChange={event => props.handleInputChange(event)}
            type="text"
            placeholder="(Required)"
          />
        </div>
      </div>
      <div className="form-details">
        <button
          className="form-button"
          onClick={event => props.handleNGOSubmit(event, props)}
        >
          Add NGO
        </button>
        <div className="update">{props.update}</div>
      </div>
    </>
  );
}

export function EmployeeForm(props) {
  return (
    <>
      <div className="form-details">
        <div className="form-details-div">
          <label>Enter First Name:</label>
          <input
            value={props.name}
            name="employeeName"
            onChange={event => props.handleInputChange(event)}
            placeholder="(Required)"
          />
        </div>
        <div className="form-details-div add-margin">
          <label>Enter Job Title:</label>
          <input
            value={props.title}
            onChange={event => props.handleInputChange(event)}
            name="employeeTitle"
            placeholder="(Required)"
          />
        </div>
        <div className="form-details-div add-margin">
          <label>NGO to support: </label>
          <div className="ngo-selection">
            {props.supports.map((support, index) => (
              <Select
                key={index}
                name={support.name}
                isChecked={support.isChecked}
                handleNGOSelect={props.handleNGOSelect}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="form-details">
        <button
          className="form-button"
          onClick={event => props.handleEmployeeSubmit(event)}
        >
          Add Employee
        </button>
        <div className="update">{props.update}</div>
      </div>
    </>
  );
}

export function Select(props) {
  const button = props.isChecked
    ? "select-button"
    : "unselect-button";
  return (
    <button
      className={button}
      value={props.name}
      onClick={event => props.handleNGOSelect(event, props)}
    >
      {props.name}
    </button>
  );
}
