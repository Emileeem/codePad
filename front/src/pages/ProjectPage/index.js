import { useCallback, useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import styles from "./styles.module.scss";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { tokyoNight } from "@uiw/codemirror-themes-all";
import { ProjectToolBar } from "../../components/ProjectToolBar";
import axios from 'axios'

export function ProjectPage() {
  const [file, setFile] = useState({content: ""})

  const onChange = useCallback((val, viewUpdate) => {
    console.log(val);
    setFile({...file, content: val});
  }, []);

  const getFile = async () => {
    const {data} = await axios.get(process.env.REACT_APP_API_URL + "/project/65c4bebe697229baef1f90c6/teste.js");
    setFile(data)
  }

  useEffect(() => {
    getFile()
  }, [])

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
                    value={file.content}
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
