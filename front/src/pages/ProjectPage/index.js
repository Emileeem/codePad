import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import styles from "./styles.module.scss";

export function ProjectPage() {
  return (
    <>
      <Container fluid>
        <Row className="justify-content-center">
          <Col sm={"6"} className="d-block">
          <Form.Control as="textarea" rows={3} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
