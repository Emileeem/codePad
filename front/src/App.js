import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from './pages/LoginPage';
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <Container fluid="md">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <LoginPage/> }/>
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
