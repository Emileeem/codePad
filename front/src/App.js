import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { ProjectPage } from "./pages/ProjectPage";
import Container from "react-bootstrap/Container";
import { AlertProvider } from "./context/alert";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <AlertProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/project" element={<ProjectPage />} />
          <Route path="/home" element={<HomePage/>} />
        </Routes>
      </BrowserRouter>
    </AlertProvider>
  );
}

export default App;
