import { useCallback, useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import styles from "./styles.module.scss";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { tokyoNight } from "@uiw/codemirror-themes-all";
import { ProjectToolBar } from "../../components/ProjectToolBar";


export function ProjectPage() {
  const [value, setValue] = useState("console.log('hello world!');");
  const onChange = useCallback((val, viewUpdate) => {
    console.log(val);
    setValue(val);
  }, []);

  return (
    <>
      <Container fluid>
        <Row className="justify-content-center flex-row-reverse">
          <Col sm={"10"} className="d-block">
            <Row className="vh-100 p-1">
              <Col xs={"12"} className="g-0 py-1 h-75 d-block">
                <Card border="primary" className="h-100 p-1">
                  <CodeMirror
                    minHeight="100%"
                    className={styles.CodeMirror}
                    theme={tokyoNight}
                    value={value}
                    extensions={[javascript({ jsx: true })]}
                    onChange={onChange}
                  />
                </Card>
              </Col>
              <Col xs={"12"} className="g-0 py-1 h-25 d-block">
                <Card border="success" className="h-100">
                  teste
                </Card>
              </Col>
            </Row>
          </Col>

          <Col sm={"2"} className="d-block">
            <ProjectToolBar/>
          </Col>
        </Row>
      </Container>
    </>
  );
}
