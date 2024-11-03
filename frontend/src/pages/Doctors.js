import React, { useEffect, useState } from "react";
import Doctor from "../components/Doctor";
import { getDoctors } from "../features/apiCalls";
import { Link } from "react-router-dom";
const Doctors = () => {
  const [Doctors, setDoctors] = useState([]);
  useEffect(() => {
    const fetchDoctors = async () => {
      const { data, error } = await getDoctors();
      if (error) {
        console.log(error);
      } else {
        setDoctors(data);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div className="container py-10 w-full max-w-5xl">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text--title">Doctors Inventory</h2>
        <Link to="/addDoctor">
          <button>Add Doctor</button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 gap-y-6 md:gap-6">
        {Doctors.length > 0 ? (
          Doctors.map((doctor) => {
            return <Doctor key={doctor.doctorId} {...doctor} />;
          })
        ) : (
          <p>No Doctors Found.</p>
        )}
      </div>
    </div>
  );
};

export default Doctors;
