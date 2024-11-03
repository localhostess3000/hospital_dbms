import axios from "axios";

export const getDoctors = async () => {
  try {
    const res = await axios.get("http://localhost:8081/doctors/");
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const addDoctor = async (doctor) => {
  try {
    const res = await axios.post("http://localhost:8081/doctors/", doctor);
    return res.data;
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};

export const updateDoctor = async (doctor, doctorId) => {
  try {
    const res = await axios.put(
      "http://localhost:8081/doctors/" + doctorId,
      doctor
    );
    return res.data;
  } catch (err) {
    return {
      error: err,
    };
  }
};
export const deleteDoctor = async (doctorId) => {
  try {
    const res = await axios.delete(
      "http://localhost:8081/doctors/" + doctorId
    );
    return res.data;
  } catch (err) {
    return { error: err };
  }
};
export const getDoctorById = async (id) => {
  try {
    const res = await axios.get("http://localhost:8081/doctors/" + id);
    return res.data;
  } catch (err) {
    return { error: err.message };
  }
};
