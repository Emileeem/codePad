import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Dropdown from "react-bootstrap/Dropdown";

import styles from "./styles.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";

export function FileDropdowns({ fileStructure, projectId }) {
  const navigate = useNavigate();

  function setFileStruct(fs, parent) {
    let result = [];
    result.push();
    let keys = Object.getOwnPropertyNames(fs);
    for (let key of keys) {
      switch (fs[key]) {
        case "file":
          result.push(<Dropdown.Item key={parent + key} onClick={() => navigate(parent + key)}>{key}</Dropdown.Item>);
          break;
        case "folder":
          result.push(
            <Dropdown key={parent + key} className={"w-100 " + styles.displace}>
              <Dropdown.Toggle
                variant="outline-light"
                className="w-100"
                id="dropdown-folder"
              >
                {key}
              </Dropdown.Toggle>
              <Dropdown.Menu className={"w-100 " + styles.dropdownStyle}>
                <Dropdown.Item disabled>{"<vazio>"}</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          );
          break;
        default:
          result.push(
            <Dropdown key={parent + key} className={"w-100 " + styles.displace}>
              <Dropdown.Toggle
                variant="outline-light"
                className="w-100"
                id="dropdown-folder"
              >
                {key}
              </Dropdown.Toggle>
              <Dropdown.Menu className={"w-100 " + styles.dropdownStyle}>
                {setFileStruct(fs[key], parent + key + "/")}
              </Dropdown.Menu>
            </Dropdown>
          );
          break;
      }
    }
    return result;
  }

  return (
    <Dropdown>
      <Dropdown.Toggle
        className="w-100 text-center fs-5"
        variant="outline-success"
        id="dropdown-files"
      >
        <FontAwesomeIcon className="my-auto col-2" icon={faFolder} />
        <span className="mx-2 d-none d-lg-inline col-10">Files</span>
      </Dropdown.Toggle>

      <Dropdown.Menu className={"w-100 " + styles.dropdownStyle}>
        {setFileStruct(fileStructure.root, "/project/" + projectId + "/")}
      </Dropdown.Menu>
    </Dropdown>
  );
}
