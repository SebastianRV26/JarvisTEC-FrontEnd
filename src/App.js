import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/jarvis" element={<Home />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
