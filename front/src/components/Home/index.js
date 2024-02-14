import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";

export function Home({ HomeHandle }) {
  return (
    <>
    <Row>
      <Card border="primary" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Título do projeto</Card.Title>
          <Card.Text>
            última modificação: 99/99/99999
          </Card.Text>
        </Card.Body>
      </Card>
      <Card border="primary" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Título do projeto</Card.Title>
          <Card.Text>
            última modificação: 99/99/99999
          </Card.Text>
        </Card.Body>
      </Card>
      <Card border="primary" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Título do projeto</Card.Title>
          <Card.Text>
            última modificação: 99/99/99999
          </Card.Text>
        </Card.Body>
      </Card>
    </Row>
    </>
  );
}
