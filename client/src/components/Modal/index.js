import React from "react";
import { Modal, Button, Alert, Container, Row, Col } from "react-bootstrap";

export function Order(props) {
  return (
    <Modal
      className="bg-dark text-light"
      show={props.show}
      onHide={props.handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="d-flex flex-row align-items-end">
          <div>{props.modal.employee.name}</div>
          <div>-</div>
          <div>{props.modal.employee.title}</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="w-100 mt-3">
        <div className="d-flex flex-column align-items-center">
          <Alert variant="dark" size="sm">NGOs Supporting:</Alert>
          <div className="d-flex flex-row justify-content-between w-100">
            {props.modal.ngo.map((each, index) => {
              return <Alert key={index} variant="success" size="sm" className="m-2 text-center">{each.name}</Alert>
            })}
          </div>
        </div>
        <div className="d-flex flex-row justify-content-around mt-4">
          <div className="d-flex flex-column w-25 mr-2">
            <h5 className="d-flex justify-content-center">Coffee Menu</h5>
            <div className="d-flex flex-column">
              {props.coffee.map((each, index) => {
                return (
                  <Button
                    className={each.qty ? "btn-success mt-2" : "mt-2"}
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
          <div className="w-75 ml-2">
            <h5 className="d-flex justify-content-center">Order</h5>
            <Container>
              <Row className="text-center">
                <Col>Item</Col>
                <Col>Qty/Price</Col>
                <Col>Total</Col>
                <Col>Remove</Col>
              </Row>
              {props.coffee.map((each, index) => {
                if (each.qty) {
                  return (
                    <Row key={index} className="text-center mt-2">
                      <Col>{each.name}</Col>
                      <Col>
                        {each.qty}x {each.price}
                      </Col>
                      <Col>{each.qty * each.price}</Col>
                      <Col>
                        <Button
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
      <Modal.Footer className="d-flex flex-row w-100 justify-content-around">
        <Button size="lg" onClick={props.handleClose}>
          Close
        </Button>
        <Button
          size="lg"
          onClick={() => props.handleSubmitOrder(props.modal.employee, props.modal.ngo)}
        >
          Order
        </Button>
        <Alert className="m-0" variant="dark" size="sm">
          Total: ${props.total}
        </Alert>
        <Alert className="m-0" variant="dark" size="sm">
          Ngo Contribution: ${props.ngoContri}
        </Alert>
      </Modal.Footer>
    </Modal>
  );
}
