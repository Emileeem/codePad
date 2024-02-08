import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";

import styles from "./styles.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleGroup, faGear, faFolder } from "@fortawesome/free-solid-svg-icons";

export function ProjectToolBar() {
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
                  <FontAwesomeIcon className="my-auto col-12 col-sm-2" icon={faPeopleGroup} />
                  <span className="mx-2 d-none d-sm-inline">Invite</span>
                </Button>
              </Col>
              <Col className="col-4 col-sm-12 mb-2">
                <Button
                  variant="outline-warning"
                  className="w-100 text-start fs-5"
                >
                  <FontAwesomeIcon className="my-auto col-12 col-sm-2" icon={faGear} />
                  <span className="mx-2 d-none d-sm-inline">Config</span>
                </Button>
              </Col>
              <Col className="col-4 col-sm-12 mb-2">
                <Dropdown>
                  <Dropdown.Toggle
                    className="w-100 text-center fs-5"
                    variant="outline-success"
                    id="dropdown-files"
                  >
                    <FontAwesomeIcon className="my-auto col-2" icon={faFolder} />
                    <span className="mx-2 d-none d-sm-inline col-10">Files</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className={"w-100 " + styles.dropdownStyle}>
                    <Dropdown.Item href="#/file-1">index.js</Dropdown.Item>

                    <Dropdown className={"w-100"}>
                      <Dropdown.Toggle
                        variant="outline-light"
                        className="w-100"
                        id="dropdown-folder"
                      >
                        Files
                      </Dropdown.Toggle>
                      <Dropdown.Menu
                        className={"w-100 " + styles.dropdownStyle}
                      >
                        <Dropdown.Item href="#/file-3">
                          Something else
                        </Dropdown.Item>
                        <Dropdown.Item href="#/file-3">
                          Something else
                        </Dropdown.Item>
                        <Dropdown.Item href="#/file-3">
                          Something else
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown.Item href="#/file-3">
                      Something else
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
          </Container>
        </Card>
      </Col>
    </Row>
  );
}
