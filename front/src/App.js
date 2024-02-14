import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { ProjectPage } from "./pages/ProjectPage";
import Container from "react-bootstrap/Container";
import { AlertProvider } from "./context/alert";

function App() {
  return (
    <AlertProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/project" element={<ProjectPage />} />
        </Routes>
      </BrowserRouter>
    </AlertProvider>
  );
}

export default App;
