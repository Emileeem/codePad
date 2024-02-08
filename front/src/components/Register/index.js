import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import styles from "./styles.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons'

export function Register({ registerHandle }) {
  return (
    <Form>
      <Row>
        <Col lg={"10"}>
          <Form.Group as={Row} className="my-3">
            <Form.Label column sm="3">
              Email
            </Form.Label>
            <Col sm={"9"}>
              <Form.Control type="email" placeholder="Enter email" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-3">
            <Form.Label column sm="3">
              Password
            </Form.Label>
            <Col sm={"9"}>
              <Form.Control type="password" placeholder="Enter password" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-3">
            <Form.Label column sm="3">
              Confirm Pwd
            </Form.Label>
            <Col sm={"9"}>
              <Form.Control type="password" placeholder="Confirm password" />
            </Col>
          </Form.Group>
        </Col>
        <Col lg={"2"} className="my-3 ml-auto d-flex ">
          <Button className="w-100" onClick={registerHandle}>
            <FontAwesomeIcon icon={faAnglesRight} />
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
