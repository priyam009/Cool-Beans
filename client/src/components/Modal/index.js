import React from "react";
import { Modal, Button, Alert, Container, Row, Col } from "react-bootstrap";
import "./style.css";

export function Order(props) {
  console.log("props", props);
  return (
    <Modal
      className="modal-wrapper"
      show={props.show}
      onHide={props.handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="d-flex flex-row align-items-end"
        >
          <div>{props.modal.employee.name}</div>
          <div>-</div>
          <div>{props.modal.employee.title}</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert className="modal-ngo" size="sm">
          <div className="modal-ngo-heading">NGOs Supporting:</div>
          <div className="modal-ngo-name">
            {props.modal.ngo.map((each, index) => {
              return (
                <Alert key={index} size="sm" className="modal-ngo-name-alert">
                  {each.name}
                </Alert>
              );
            })}
          </div>
        </Alert>

        <div className="modal-main-content">
          <div className="modal-main-content-menu">
            <h5 className="modal-menu-heading ">Coffee Menu</h5>
            <div className="d-flex flex-column">
              {props.coffee.map((each, index) => {
                return (
                  <Button
                    className={
                      each.qty
                        ? "modal-menu-button-active modal-menu-button-common"
                        : "modal-menu-button-inactive modal-menu-button-common"
                    }
                    key={index}
                    name={each.name}
                    value="add"
                    onClick={props.handleOrderAdd}
                  >
                    {each.name}: ${each.price}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="w-75">
            <h5 className="modal-order-heading">Order</h5>
            <Container>
              <Row className="text-center modal-order-row">
                <Col>Item</Col>
                <Col>Qty/Price</Col>
                <Col>Total</Col>
                <Col>Remove</Col>
              </Row>
              {props.coffee.map((each, index) => {
                if (each.qty) {
                  return (
                    <Row key={index} className="modal-order-row-content">
                      <Col>{each.name}</Col>
                      <Col>
                        {each.qty}x {each.price}
                      </Col>
                      <Col>{each.qty * each.price}</Col>
                      <Col>
                        <Button
                          className="modal-order-remove"
                          name={each.name}
                          size="sm"
                          value="remove"
                          onClick={props.handleOrderRemove}
                        >
                          X
                        </Button>
                      </Col>
                    </Row>
                  );
                }
              })}
            </Container>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex flex-column w-100">
        <div className="footer-content">
          <Button className="footer-button" onClick={props.handleClose}>
            Close
          </Button>
          <Alert className="footer-alert">
            Ngo Contribution: ${props.ngoContri}
          </Alert>
          <Alert className="footer-alert">Total: ${props.total}</Alert>
          <Button
            className="footer-button"
            onClick={() =>
              props.handleSubmitOrder(props.modal.employee, props.modal.ngo)
            }
          >
            Order
          </Button>
        </div>
        <div>
          <Button
            className="modal-account-delete"
            onClick={() => props.handleEmployeeDelete(props.modal.employee._id)}
          >
            Delete Account
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
