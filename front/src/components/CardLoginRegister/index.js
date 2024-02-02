import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

export function CardLoginRegister({ title, children }) {
  return (
    <Card bg="dark" border="success" column sm="3">
      <Card.Body>
      <Card.Title className="text-center mb-5">
        {title}
      </Card.Title>
        {children}
      </Card.Body>
    </Card>
  );
}
