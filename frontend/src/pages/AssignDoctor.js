import React, { useEffect, useState } from "react";
import { getUnassignedPatients, assignDoctorByName } from "../features/apiCalls";
import { useNavigate } from "react-router-dom";

const AssignDoctor = () => {
  const [patients, setPatients] = useState([]);
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUnassignedPatients = async () => {
      const response = await getUnassignedPatients();
      if (response.data) setPatients(response.data); 
      else console.error(response.error || "Error fetching unassigned patients");
    };
    fetchUnassignedPatients();
  }, []);
  
  const handleAssign = async (patientFirstName, patientLastName) => {
    const { error } = await assignDoctorByName(patientFirstName, patientLastName, doctorFirstName, doctorLastName);
    if (!error) {
      setPatients((prev) => prev.filter((p) => p.FirstName !== patientFirstName && p.LastName !== patientLastName));
      alert("Doctor assigned successfully!");
    }
  };

  return (
    <div className="container max-w-5xl py-10">
      <h2 className="text--title">Assign Doctor to Patients</h2>
      <input
        placeholder="Doctor First Name"
        value={doctorFirstName}
        onChange={(e) => setDoctorFirstName(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        placeholder="Doctor Last Name"
        value={doctorLastName}
        onChange={(e) => setDoctorLastName(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 gap-y-6 md:gap-6">
        {patients.length > 0 ? (
          patients.map((patient) => (
            <div key={patient.PatientID} className="border p-4 rounded">
              <p>{patient.FirstName} {patient.LastName}</p>
              <button onClick={() => handleAssign(patient.FirstName, patient.LastName)}>Assign</button>
            </div>
          ))
        ) : (
          <p>No unassigned patients found.</p>
        )}
      </div>
    </div>
  );
};

export default AssignDoctor;
