import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

export function Home({ HomeHandle }) {
  return (
    <>
    <Row className="m-4 p-2">
      <Card className="m-4 p-2" border="primary" style={{ width: "25rem" }}>
        <Card.Body>
          <Card.Title>Título do projeto</Card.Title>
          <Card.Text>
            última modificação: 99/99/99999
          </Card.Text>
          <Button>

          </Button>
        </Card.Body>
      </Card>
      <Card className="m-4 p-2" border="primary" style={{ width: "25rem" }}>
        <Card.Body>
          <Card.Title>Título do projeto</Card.Title>
          <Card.Text>
            última modificação: 99/99/99999
          </Card.Text>
        </Card.Body>
      </Card>
      <Card className="m-4 p-2" border="primary" style={{ width: "25rem" }}>
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
