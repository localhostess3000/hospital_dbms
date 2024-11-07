import React from "react";
import { Link } from "react-router-dom";
import { deleteDoctor } from "../features/apiCalls";
const BASE_API_URL = "http://localhost:8081";

const Doctor = ({ DoctorID, FirstName, LastName, Department }) => {
  return (
    <>
      <div className="border-2 rounded overflow-hidden flex flex-col">
        <img
          className="h-32 w-32"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-L1M54UjKgcRW_kSObOtR45psjzm7h94NxQ&s"
        /> 


        <div className="flex flex-col p-4">

          <h4 className="mb-1 text-xl font-medium ">
            <Link to={`/doctors/${DoctorID}`} style={{ color: "white", background: "black", padding: "5px"}}> Doctor ID: {DoctorID}</Link>
            {" "}

          </h4>
          {FirstName} {LastName}
          <div className="flex items-center justify-between">
            <p className="py-1 px-3 bg-slate-200 w-fit text-2xl font-semibold rounded">
              {Department}
            </p>
          </div>
          <div>
            <div className="flex flex-col sm:flex-row items-center space-y-5 sm:space-y-0 sm:space-x-5 my-5">
              <button
                onClick={async () => {
                  await deleteDoctor(DoctorID);
                  console.log("Deleted");
                }}
                className="uppercase border-gray-500 text-gray-500 w-full font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Doctor;
