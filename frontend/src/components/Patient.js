import React from "react";
import { Link } from "react-router-dom";

const BASE_API_URL = "http://localhost:8081/";

const Patient = ({ patientId, FirstName, LastName, Gender, DOB, AssignedDoctorID, DoctorFirstName, DoctorLastName }) => {
  const humanizedDate = new Date(DOB).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <>
      <div className="border-2 rounded overflow-hidden flex flex-col">
        <img
          className="h-32 w-32"
          src="https://uxwing.com/wp-content/themes/uxwing/download/health-sickness-organs/hospital-patient-icon.png"
        />

        <div className="flex flex-col p-4">
          <h4 className="mb-1 text-xl font-medium ">
            {FirstName} {LastName}
          </h4>
          <div className="flex items-center justify-between">
            <p className="py-1 px-3 bg-slate-200 w-fit text-2xl font-semibold rounded">
              Gender: {Gender}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="py-1 px-3 bg-slate-200 w-fit text-2xl font-semibold rounded">
              DOB: {humanizedDate}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="py-1 px-3 bg-slate-200 w-fit text-2xl font-semibold rounded">
              Assigned Doctor: {DoctorFirstName ? DoctorFirstName : "Unassigned"} &nbsp;
              {DoctorLastName ? DoctorLastName : ""}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Patient;
