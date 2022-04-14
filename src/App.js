import './App.css';
import { Route, Routes } from "react-router-dom";
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import WebcamCapture from './components/webCamara/WebcamCapture';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/camara" element={<WebcamCapture />} />
      </Routes>
    </div>
  );
}

export default App;
