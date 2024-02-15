import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { ProjectPage } from "./pages/ProjectPage";
import { FileApiProvider } from "./context/FileApi";
import { HomePage } from "./pages/HomePage";
import { AlertProvider } from "./context/Alert";

function App() {
  return (
    <BrowserRouter>
      <AlertProvider>
        <FileApiProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/project/:projectId/*" element={<ProjectPage />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </FileApiProvider>
      </AlertProvider>
    </BrowserRouter>
  );
}

export default App;
