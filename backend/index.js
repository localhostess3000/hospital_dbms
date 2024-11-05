const express = require("express");
const mysql = require("mysql");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
require("dotenv").config();
console.log(process.env);
console.log(process.env.DB_PASSWORD);
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "narnia123",
  database: "hospital",
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
