import Card from "react-bootstrap/Card";

export function CardLoginRegister({ title, children }) {
  return (
    <Card bg="dark" border="success" md="3">
      <Card.Body>
      {/* <Card.Title className="text-center mb-5">
        {title}
      </Card.Title> */}
        {children}
      </Card.Body>
    </Card>
  );
}
