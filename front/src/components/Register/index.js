import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export function Register() {
  return (
    <Form>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="3">
          Email
        </Form.Label>
        <Col sm="9">
          <Form.Control type="email" placeholder="Enter email" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="3">
          Password
        </Form.Label>
        <Col sm="9">
          <Form.Control type="password" placeholder="Enter password" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="3">
          Confirm Password
        </Form.Label>
        <Col sm="9">
          <Form.Control type="password" placeholder="Confirm password" />
        </Col>
      </Form.Group>
    </Form>
  );
}
