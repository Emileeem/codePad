import { useCallback, useEffect, useState, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import styles from "./styles.module.scss";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { tokyoNight } from "@uiw/codemirror-themes-all";
import { ProjectToolBar } from "../../components/ProjectToolBar";
import { FileApiContext } from "../../context/FileApi";

export function ProjectPage() {
  const location = useLocation()
  const { updateFile, getFile, getFileStruct } = useContext(FileApiContext);
  const [fileStructure, setfileStructure] = useState({ root: {} });
  const [fileContent, setFileContent] = useState("")
  const [currFile, setCurrFile] = useState({
    content: "",
    createdAt: "",
    fileName: "",
    removedAt: "",
    updatedAt: "",
    _id: "",
  });

  const { projectId } = useParams();
  let timeoutId = 0


  const onChange = useCallback((val, viewUpdate) => {
    setFileContent(val);
    console.log(fileStructure)
  }, []);

  const loadFileStruct = async () => {
    setfileStructure(await getFileStruct(projectId));
  }
  const getAndSetFile = async (path) => {
    setCurrFile(
      await getFile(
        projectId,
        path.substring(("/project/" + projectId).length))
    )
  }

  
  useEffect(() => {
    loadFileStruct()
    console.log(fileStructure)
  }, []);

  useEffect( () => {
    getAndSetFile(location.pathname)
  }, [location.pathname]);

  useEffect(() => {
    setFileContent(currFile.content);
  }, [currFile])

  useEffect(() => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      updateFile(projectId, currFile._id, currFile.fileName, fileContent)
      console.log("saved")
      clearTimeout(timeoutId)
    }, 1000)
  }, [fileContent])

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
                    value={fileContent}
                    extensions={[javascript({ jsx: true })]}
                    onChange={onChange}
                  />
                </Card>
              </Col>
              <Col xs={"12"} className="g-0 py-1 h-25 d-block">
                <Card border="success" className="h-100">
                  <Card.Body>
                    WIP - Console
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>

          <Col sm={"2"} className="d-block">
            <ProjectToolBar
              fileStructure={fileStructure}
              projectId={projectId}
              loadFileStruct={loadFileStruct}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
