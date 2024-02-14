import { useContext } from "react";
import { Alert } from "react-bootstrap";
import { AlertContext } from "../../context/alert";

export default function AlertComponent() {
  const { message, variant, show, setShow } = useContext(AlertContext);
  return (
      <Alert
        show={show}
        variant={variant}
        onClose={() => setShow(false)}
        dismissible
      >
        <p>{message}</p>
      </Alert>
  );
}
