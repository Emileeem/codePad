import styles from "./styles.module.scss";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from "./logo.png"
import { i18n } from "../../translate/i18n"
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

export function Menu({ MenuHandle }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#"><img src={logo} className={styles.logo}/>CodePad</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          <Nav.Link href="#action2" className={styles.text}>{i18n.t("navBar.Profile")}</Nav.Link>
          <Nav.Link onClick={handleShow}>{i18n.t("navBar.New")}</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder={i18n.t("navBar.Placeholder")}
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">{i18n.t("navBar.Search")}</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>

     <Modal show={show} onHide={handleClose}>
     <Modal.Header closeButton>
       <Modal.Title>Novo Projeto</Modal.Title>
     </Modal.Header>
     <Modal.Body>
     <Form>
      <Form.Group>
        <Form.Label>Nome do Projeto</Form.Label>

        <Form.Control
          className={styles.inputEmail}
          type="text"
          placeholder="Insira o nome do projeto"
          variant="success"
        />
        <br/>
        <Form.Label>Descrição do Projeto</Form.Label>

        <Form.Control
          className={styles.inputEmail}
          type="password"
          placeholder="Adicione uma descrição"
          variant="success"
          
        />
      </Form.Group>
      
    </Form>
     </Modal.Body>
     <Modal.Footer>
       <Button variant="secondary" onClick={handleClose}>
         Close
       </Button>
       <Button variant="primary" onClick={handleClose}>
         Save Changes
       </Button>
     </Modal.Footer>
   </Modal>
   </>
  );
}
