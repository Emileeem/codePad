import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

export function Register() {
  return (
    <Card bg="dark" border="success">
      <Card.Body>
        <Form>
          <Form.Group>
            <Form.Label>Email address</Form.Label>

            <Form.Control type="email" placeholder="Enter email" variant="success" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}
