import { createContext, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

export const FileApiContext = createContext();
FileApiContext.displayName = "FileApi";

export const FileApiProvider = ({ children }) => {
  const location = useLocation();

  const getFile = async (projectId, filename) => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_URL +
        "/project/" +
        projectId +
        "/files" +
        filename
    );
    return data;
  };

  const createFile = async (projectId, filename) => {
    let file = filename;
    if (filename.charAt(0) == "/")
      file = file.substring(1);
    await axios.put(process.env.REACT_APP_API_URL + "/project/", {
      projectId: projectId,
      fileName: filename,
      content: "",
    });
  };

  const updateFile = async (projectId, id, filename, content) => {
    if(!id && !filename && !content)
      return

    await axios.put(process.env.REACT_APP_API_URL + "/project/", {
      projectId: projectId,
      fileName: filename,
      content: content,
      id: id
    });
  };

  const getFileStruct = async (projectId) => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_URL + "/project/" + projectId + "/files"
    );
    return data;
  };

  return (
    <FileApiContext.Provider
      value={{
        getFile,
        getFileStruct,
        createFile,
        updateFile,
      }}
    >
      {children}
    </FileApiContext.Provider>
  );
};
