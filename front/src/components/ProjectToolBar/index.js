import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";

import styles from "./styles.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleGroup, faGear, faFolder } from "@fortawesome/free-solid-svg-icons";
import { FileDropdowns } from "../FileDropdowns";
import { NewFileModal } from "../NewFileModal";

export function ProjectToolBar({ fileStructure, projectId, loadFileStruct }) {
  return (
    <Row className="h-100 p-1">
      <Col xs={"12"} className="g-0 py-1">
        <Card border="danger" className="h-100 p-2">
          <Container>
            <Row className="g-0">
              <Col className="col-4 col-sm-12 mb-2">
                <Button
                  variant="outline-primary"
                  className="w-100 text-start fs-5"
                >
                  <FontAwesomeIcon className="my-auto col-12 col-lg-2" icon={faPeopleGroup} />
                  <span className="mx-2 d-none d-lg-inline">Invite</span>
                </Button>
              </Col>
              <Col className="col-4 col-sm-12 mb-2">
                <Button
                  variant="outline-warning"
                  className="w-100 text-start fs-5"
                >
                  <FontAwesomeIcon className="my-auto col-12 col-lg-2" icon={faGear} />
                  <span className="mx-2 d-none d-lg-inline">Config</span>
                </Button>
              </Col>
              <Col className="col-4 col-sm-12 mb-2">
                <FileDropdowns fileStructure={fileStructure} projectId={projectId}/>
              </Col>
              <Col className="col-4 col-sm-12 mb-2">
                <NewFileModal projectId={projectId} loadFileStruct={loadFileStruct}></NewFileModal>
              </Col>
            </Row>
          </Container>
        </Card>
      </Col>
    </Row>
  );
}
