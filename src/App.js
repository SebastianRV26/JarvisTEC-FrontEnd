import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Jarvis from "./pages/Jarvis/Jarvis";
import Home from "./pages/Home/Home";
import Detection from "./pages/Detection/Detection";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />}>
          <Route index element={<Navigate to="jarvis" replace />} />
          <Route path="jarvis" element={<Jarvis />} />
          <Route path="detection" element={<Detection />} />
        </Route>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
