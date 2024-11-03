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
    DoctorId: "",
  });
  const [selectedImage, setSelectedImage] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getDoctor = async () => {
      const { data } = await getDoctorById(id);
      console.log(data);
      if (data) setDeafaultValue({ ...data[0] });
    };
    getDoctor();
  }, [id]);

  // useEffect(() => {
  //   let url;
  //   if (selectedImage) {
  //     url = URL.createObjectURL(selectedImage);
  //     setPreviewUrl(url);
  //   }
  //   return () => {
  //     URL.revokeObjectURL(url);
  //   };
  // }, [selectedImage]);

  const {firstName, lastName, department, DoctorId} = defaultValue;
  console.log(DoctorId);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target);
    let formData = new FormData(e.target);
    let fileFormData = new FormData();

    const values = Object.fromEntries(formData.entries());
    const dId = !DoctorId
      ? values.firstName.toLowerCase().replaceAll(/[\s\t]+/g, "-")
      : DoctorId;
    fileFormData.append("DoctorId", dId);
    try {
      if (dId && !!DoctorId) {
        let { data, error } = await updateDoctor(values, DoctorId);
        if (error) throw new Error(error);
      } else if (dId) {
        let formValues = {
          DoctorId: dId,
          ...values,
        };
        let { data, error } = await addDoctor(formValues);
        if (error) throw new Error(error);
      }
    } catch (err) {
      console.log(err);
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
      <div className="flex flex-col">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>First Name</label>
            <input
              defaultValue={firstName || ""}
              name="firstName"
              placeholder="Enter First Name..."
              type="text"
            />
          </div>
          <div className="mb-4">
            <label>Last Name</label>
            <input
              defaultValue={lastName || ""}
              name="lastName"
              placeholder="Enter Last Name..."
              type="text"
            />
          </div>
          <div className="mb-4">
            <label>Doctor Department</label>
            <textarea
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
