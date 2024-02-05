import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from './pages/LoginPage';
import { ProjectPage } from './pages/ProjectPage';
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <Container fluid="md">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <LoginPage/> }/>
          <Route path="/project" element={ <ProjectPage/> }/>
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
