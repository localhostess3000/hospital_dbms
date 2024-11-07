import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Doctors from "./pages/Doctors";
import AddDoctor from "./pages/AddDoctor";


import Patients from "./pages/Patients";
import AddPatient from "./pages/AddPatient";

import AssignDoctor from "./pages/AssignDoctor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Doctors/>} />
        <Route path="/addDoctor" element={<AddDoctor />} />

        <Route path="/patients" element={<Patients />} />
        <Route path="/addPatient" element={<AddPatient />} />
        <Route path="/assignDoctor" element={<AssignDoctor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;