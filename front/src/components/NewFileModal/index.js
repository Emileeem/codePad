import { useState, useContext } from "react";
import { FileApiContext } from "../../context/FileApi";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export function NewFileModal({ projectId, loadFileStruct}) {
  const [show, setShow] = useState(false);
  const [filename, setFilename] = useState("");
  const { createFile } = useContext(FileApiContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCreate = () => {
    createFile(projectId, filename)
    loadFileStruct()
    handleClose()
  };

  return (
    <>
      <Button variant="success" className="w-100" onClick={handleShow}>
        Create New File
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a new file</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Filename</Form.Label>

              <Form.Control
                type="text"
                placeholder="Enter filename"
                variant="success"
                onChange={(e) => setFilename(e.target.value)}
              />
              <Form.Text className="text-muted">
                Include file path in filename
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Create File
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
