import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addPatient, updatePatient, getPatientById } from "../features/apiCalls";

const AddPatient = () => {
  const { id } = useParams();
  const [defaultValue, setDefaultValue] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    patientId: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getPatient = async () => {
      if (id) {
        const { data } = await getPatientById(id);
        if (data) setDefaultValue({ ...data[0] });
      }
    };
    getPatient();
  }, [id]);

  const { firstName, lastName, gender, dob, patientId } = defaultValue;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());

    // Generate a random numeric ID if it's a new patient
    const pId = !patientId
      ? Math.floor(100000 + Math.random() * 900000)
      : parseInt(patientId);

    try {
      if (pId && !!patientId) {
        const { data, error } = await updatePatient({ ...values, patientId: pId }, patientId);
        if (error) throw new Error(error);
        navigate(-1);
      } else {
        const formValues = {
          PatientID: pId, // Use 'PatientID' to match the backend
          FirstName: values.firstName,
          LastName: values.lastName,
          Gender: values.gender,
          DOB: values.dob,
        };
        const { data, error } = await addPatient(formValues);
        if (error) throw new Error(error);
        navigate(-1);
      }
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <div className="container max-w-5xl py-10">
      <div className="flex space-x-6 mb-10 items-center">
        <button
          onClick={() => navigate(-1)}
          className="h-10 leading-none text-xl"
        >
          {"<"}
        </button>
        <h2 className="text--title">
          {defaultValue.firstName ? "Update Patient" : "Add Patient"}
        </h2>
      </div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <div className="flex flex-col">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>First Name</label>
            <input
              required
              defaultValue={firstName || ""}
              name="firstName"
              placeholder="Enter First Name..."
              type="text"
            />
          </div>
          <div className="mb-4">
            <label>Last Name</label>
            <input
              required
              defaultValue={lastName || ""}
              name="lastName"
              placeholder="Enter Last Name..."
              type="text"
            />
          </div>

          <div className="mb-4">
            <label>Gender</label>
            <input
              required
              defaultValue={gender || ""}
              name="gender"
              placeholder="Enter Gender..."
              type="text"
            />
          </div>

          <div className="mb-4">
            <label>Date of Birth</label>
            <input
              required
              defaultValue={dob || ""}
              name="dob"
              placeholder="Enter Date of Birth..."
              type="date"
            />
          </div>
          <div className="flex items-center mb-5">
            <button className="w-full">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatient;

