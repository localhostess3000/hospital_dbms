import axios from "axios";

// all doctor related api calls
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
    const res = await axios.delete("http://localhost:8081/doctors/" + doctorId);
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

// all patient realted api calls
export const getPatients = async () => {
  try {
    const res = await axios.get("http://localhost:8081/patients/");
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// apicalls.js
export const addPatient = async (patient) => {
  try {
    const res = await axios.post("http://localhost:8081/patients/", patient);
    return res.data;
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};

export const updatePatient = async (patient, patientId) => {
  try {
    const res = await axios.put(
      "http://localhost:8081/patients/" + patientId,
      patient
    );
    return res.data;
  } catch (err) {
    return {
      error: err,
    };
  }
};

export const deletePatient = async (patient, patientId) => {
  try {
    const res = await axios.put(
      "http://localhost:8081/patients/" + patientId,
      patient
    );
    return res.data;
  } catch (err) {
    return {
      error: err,
    };
  }
};


export const getPatientById = async (id) => {
  try {
    const res = await axios.get("http://localhost:8081/patients/" + id);
    return res.data;
  } catch (err) {
    return { error: err.message };
  }
}
