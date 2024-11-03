import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addDoctor, updateDoctor, getDoctorById } from "../features/apiCalls";

const BASE_API_URL = "http://localhost:8081";
const AddDoctor = () => {
  const { id } = useParams();
  const [defaultValue, setDeafaultValue] = useState({
    firstName: "",
    lastName: "",
    department: "",
    doctorId: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getDoctor = async () => {
      if (id) {
        const { data } = await getDoctorById(id);
        if (data) setDeafaultValue({ ...data[0] });
      }
    };
    getDoctor();
  }, [id]);

  const { firstName, lastName, department, doctorId } = defaultValue;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());

    // Generate a random numeric ID if it's a new doctor
    const dId = !doctorId
      ? Math.floor(100000 + Math.random() * 900000)
      : doctorId;

    try {
      if (dId && !!doctorId) {
        const { data, error } = await updateDoctor(values, doctorId);
        if (error) throw new Error(error);
        navigate(-1);
      } else {
        const formValues = {
          doctorId: dId,
          ...values,
        };
        const { data, error } = await addDoctor(formValues);
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
          {defaultValue.firstName ? "Update Doctor" : "Add Doctor"}
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
            <label>Doctor Department</label>
            <textarea
              required
              defaultValue={department || ""}
              name="department"
              className="resize-none"
              rows={5}
            ></textarea>
          </div>
          <div className="flex items-center mb-5">
            <button className="w-full">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
