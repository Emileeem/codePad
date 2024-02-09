import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from './pages/LoginPage';
import { ProjectPage } from './pages/ProjectPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <LoginPage/> }/>
        <Route path="/project/:projectId/*" element={ <ProjectPage/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
