import styles from "./styles.module.scss";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "./logo.png";
import { i18n } from "../../translate/i18n";
import Modal from "react-bootstrap/Modal";
import { AlertContext } from "../../context/Alert";
import { useContext, useState } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import AlertComponent from "../../components/AlertComponent";
import * as jwt_decode from "jwt-decode";

export function Menu({ MenuHandle }) {
  const { setMessage, setShow, setVariant } = useContext(AlertContext);

  const [show, setShoww] = useState(false);

  const handleClose = () => setShoww(false);
  const handleShow = () => setShoww(true);

  var [title, setTitle] = useState("");
  var [description, setDescription] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();

    if (!formValid()) return;

    const token = sessionStorage.getItem("token");
    const decodeToken = jwt_decode.jwtDecode(token);
    try {
      console.log(decodeToken)
      var res = await axios.post(process.env.REACT_APP_API_URL + "/project", {
        userid: decodeToken.id,
        title,
        description,
      });

      setMessage(res.data.message);
      setVariant("success");
      setShow(true);
      setTitle("");
      setDescription("");
      setShoww(false);
    } catch (error) {
      console.log(error);
    }
  }
  function formValid() {
    if (!title) {
      setMessage(i18n.t("createProject.message"));
      setShow(true);
      setVariant("danger");
      return false;
    }
    return true;
  }

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#">
            <img src={logo} className={styles.logo} />
            CodePad
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#action2" className={styles.text}>
                {i18n.t("navBar.Profile")}
              </Nav.Link>
              <Nav.Link onClick={handleShow}>{i18n.t("navBar.New")}</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder={i18n.t("navBar.Placeholder")}
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">
                {i18n.t("navBar.Search")}
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <AlertComponent />
        <Modal.Header closeButton>
          <Modal.Title>{i18n.t("createProject.proj")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="form" onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>{i18n.t("createProject.title")}</Form.Label>

              <Form.Control
                className={styles.inputEmail}
                type="text"
                placeholder={i18n.t("createProject.placTitle")}
                variant="success"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <br />
              <Form.Label>{i18n.t("createProject.descript")}</Form.Label>

              <Form.Control
                className={styles.inputEmail}
                type="text"
                placeholder={i18n.t("createProject.placDescript")}
                variant="success"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {i18n.t("createProject.close")}
          </Button>
          <Button type="submit" form="form" variant="primary">
            {i18n.t("createProject.save")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
