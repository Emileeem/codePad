import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { ProjectPage } from "./pages/ProjectPage";
import { FileApiProvider } from "./context/FileApi";

function App() {
  return (
    <BrowserRouter>
      <FileApiProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/project/:projectId/*" element={<ProjectPage />} />
        </Routes>
      </FileApiProvider>
    </BrowserRouter>
  );
}

export default App;
