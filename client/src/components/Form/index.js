import React from "react";

export function Form({ children }) {
  return <form>{children}</form>;
}
export function NGOForm(props) {
  console.log("NGOform", props);
  return (
    <>
      <div>
        <label>Enter Name:</label>
        <input
          value={props.name}
          name="ngoName"
          onChange={event => props.handleInputChange(event)}
          type="text"
          placeholder="(Required)"
        />
      </div>
      <div>
        <label>Enter Purpose:</label>
        <textarea
          value={props.purpose}
          name="ngoPurpose"
          onChange={event => props.handleInputChange(event)}
          type="text"
          placeholder="(Required)"
        />
      </div>
      <button
        className="card-link btn btn-dark"
        onClick={event => props.handleNGOSubmit(event, props)}
      >
        Add NGO
      </button>
    </>
  );
}

export function EmployeeForm(props) {
  // console.log("Employee", props);
  return (
    <>
      <div>
        <label>Enter First Name:</label>
        <input
          value={props.firstName}
          name="employeeName"
          onChange={event => props.handleInputChange(event)}
          placeholder="(Required)"
        />
      </div>
      <div>
        <label>Enter Job Title:</label>
        <input
          value={props.title}
          onChange={event => props.handleInputChange(event)}
          name="employeeTitle"
          placeholder="(Required)"
        />
      </div>
      <div className="d-flex">
        <label>NGO to support: </label>
        <div>
          {props.supports.map((support, index) => (
            <Checkbox 
            key={index}
            name={support.name}
            isChecked={support.isChecked}
            handleCheckboxChange={props.handleCheckboxChange}
            />
          ))}
        </div>
      </div>
      <button
        className="card-link btn btn-dark"
        onClick={event => props.handleEmployeeSubmit(event, props)}
      >
        Add Employee
      </button>
    </>
  );
}

export function Checkbox(props) {
  console.log("checkbox props", props);
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        value={props.name}
        onChange={props.handleCheckboxChange}
        checked={props.isChecked}
        id="defaultCheck1"
      />
      <label className="form-check-label" htmlFor="defaultCheck1">
        {props.support}
      </label>
    </div>
  );
}
