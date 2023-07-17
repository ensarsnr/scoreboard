import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Modal from "react-bootstrap/Modal";
import { BsPersonAdd } from "react-icons/bs";
import FormComp from "./FormComp";
import sunny from "../img/sunny.jpeg";
import { Image } from "react-bootstrap";
function NavBar() {
  // Hooks

  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <>
      <Navbar className="bg-white">
        <Container fluid className="mt-2">
          <Navbar.Brand>
            <Image style={{ width: "350px" }} className="mt-3" src={sunny} />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Button onClick={handleClick} variant="success">
              <div className="flex justify-between">
                <BsPersonAdd className=" mt-1 mr-2" />
                Yeni Yarışmacı Ekle
              </div>
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal
        show={showPopup}
        onHide={handleClose}
        centered
        dialogClassName="modal-position"
      >
        <Modal.Header closeButton>
          <Modal.Title ><h3 className="text-blue-500">Yeni Yarışmacı</h3></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormComp />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavBar;
