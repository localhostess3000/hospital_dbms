import logo from "./logo.svg";
import "./App.css";
import Doctors from "./pages/Doctors";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddDoctor from "./pages/AddDoctor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Doctors/>} />
        <Route path="/addDoctor" element={<AddDoctor />} />
        <Route path="/updateDoctor/:id" element={<AddDoctor />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
