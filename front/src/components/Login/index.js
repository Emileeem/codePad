import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "./styles.module.scss";

export function Login({ loginHandle }) {
  return (
    <Form>
      <Form.Group>
        <Form.Label>Email address</Form.Label>

        <Form.Control
          className={styles.inputEmail}
          type="email"
          placeholder="Enter email"
          variant="success"
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <div className="d-flex justify-content-end">
        <Button onClick={loginHandle}>Login</Button>
      </div>
    </Form>
  );
}
