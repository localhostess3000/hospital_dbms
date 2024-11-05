import React, { useEffect, useState } from "react";
import Patient from "../components/Patient";
import { getPatients } from "../features/apiCalls";
import { Link } from "react-router-dom";
const Patients = () => {
  const [Patients, setPatients] = useState([]);
  useEffect(() => {
    const fetchPatients = async () => {
      const { data, error } = await getPatients();
      if (error) {
        console.log(error);
      } else {
        setPatients(data);
      }
    };
    fetchPatients();
  }, []);

  return (
    <div className="container py-10 w-full max-w-5xl">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text--title">Patients Inventory</h2>
        <Link to="/addPatient">
          <button>Add Patient</button>
        </Link>
      </div>

      {/* <h2>{Patients.length} Patients Found</h2> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 gap-y-6 md:gap-6">
        {Patients.length > 0 ? (
          Patients.map((patient) => {
            return <Patient key={patient.patientId} {...patient} />;
          })
        ) : (
          <p>No Patients Found.</p>
        )}
      </div>
    </div>
  );
};

export default Patients;
