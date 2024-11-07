const express = require("express");
const mysql = require("mysql");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pass123",
  database: "hospital",
});
db.connect((err) => {
  if (err) return console.error(err.message);

  console.log('Connected to the MySQL server.');
});
const app = express();
app.use(cors());
app.use(express.json());

app.get("/doctors", (req, res) => {
  const q = "SELECT * FROM doctor";
  db.query(q, (err, data) => {
    if (err) return res.json({ error: err.sqlMessage });
    return res.json({ data });
  });
});

app.post("/doctors", (req, res) => {
  const q =
    "INSERT INTO doctor (doctorId, firstName, lastName, department) VALUES (?)";
  const values = [
    parseInt(req.body.doctorId), // Convert to integer
    req.body.firstName,
    req.body.lastName,
    req.body.department,
  ];

  db.query(q, [values], (err, data) => {
    if (err) {
      return res.json({ error: err.sqlMessage });
    }
    return res.json({ data });
  });
});

app.get("/doctors/:id", (req, res) => {
  const q = "SELECT * FROM doctor WHERE doctorId = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json({ error: err.sqlMessage });
    return res.json({ data });
  });
});

app.get("/patients", (req, res) => {
  // const q = "SELECT * FROM patient";
  const q = `
  SELECT p.PatientID, p.FirstName AS FirstName, p.LastName AS LastName, p.Gender AS Gender, p.DOB AS DOB, 
             d.DoctorID, d.FirstName AS DoctorFirstName, d.LastName AS DoctorLastName
      FROM patient p
      LEFT JOIN patient_doctor pd ON p.PatientID = pd.PatientID
      LEFT JOIN doctor d ON pd.DoctorID = d.DoctorID;
  `
  db.query(q, (err, data) => {
    if (err) return res.json({ error: err.sqlMessage });
    return res.json({ data });
  });
});

app.get("/patients2", (req, res) => {
  const q = "SELECT * FROM patient";
  
  db.query(q, (err, data) => {
    if (err) return res.json({ error: err.sqlMessage });
    return res.json({ data });
  });
});


app.post("/patients", (req, res) => {
  const q =
    "INSERT INTO patient (PatientID, FirstName, LastName, Gender, DOB) VALUES (?)";
  const values = [
    parseInt(req.body.PatientID), // Convert to integer
    req.body.FirstName,
    req.body.LastName,
    req.body.Gender,
    req.body.DOB,
  ];

  app.post("/assignDoctorToPatient", (req, res) => {
    const { patientFirstName, patientLastName, doctorFirstName, doctorLastName } = req.body;
  
    // Query to find the patient ID
    const patientQuery = "SELECT PatientID FROM patient WHERE FirstName = ? AND LastName = ?";
    db.query(patientQuery, [patientFirstName, patientLastName], (err, patientData) => {
      if (err || patientData.length === 0) return res.json({ error: "Patient not found" });
      
      const patientId = patientData[0].PatientID;
  
      // Query to find the doctor ID
      const doctorQuery = "SELECT DoctorID FROM doctor WHERE FirstName = ? AND LastName = ?";
      db.query(doctorQuery, [doctorFirstName, doctorLastName], (err, doctorData) => {
        if (err || doctorData.length === 0) return res.json({ error: "Doctor not found" });
        
        const doctorId = doctorData[0].DoctorID;
  
        // Insert into patient_doctor table
        const assignQuery = "INSERT INTO patient_doctor (PatientID, DoctorID) VALUES (?, ?)";
        db.query(assignQuery, [patientId, doctorId], (err, data) => {
          if (err) return res.json({ error: err.sqlMessage });
          return res.json({ success: "Doctor assigned to patient successfully", data });
        });
      });
    });
  });

  app.get("/patients/unassigned", (req, res) => {
    const q = `
      SELECT * FROM patient 
      WHERE PatientID NOT IN (SELECT PatientID FROM patient_doctor)
    `;
    db.query(q, (err, data) => {
      if (err) return res.json({ error: err.sqlMessage });
      return res.json({ data });
    });
  });

  app.get("/patientsWithDoctors", (req, res) => {
    const q = `
      SELECT p.PatientID, p.FirstName AS PatientFirstName, p.LastName AS PatientLastName,
             d.DoctorID, d.FirstName AS DoctorFirstName, d.LastName AS DoctorLastName
      FROM patient p
      LEFT JOIN patient_doctor pd ON p.PatientID = pd.PatientID
      LEFT JOIN doctor d ON pd.DoctorID = d.DoctorID
    `;
    db.query(q, (err, data) => {
      if (err) return res.json({ error: err.sqlMessage });
      console.log(data);
      return res.json({ data });
    });
  });
  
  db.query(q, [values], (err, data) => {
    if (err) {
      return res.json({ error: err.sqlMessage });
    }
    return res.json({ data });
  });
});

app.listen(8081, () => {
  console.log("listening on 8081");
});
