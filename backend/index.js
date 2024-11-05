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

// fetch patient associated with a doctor
app.get("/doctors/:doctorId/patients", (req, res) => {
  const doctorId = req.params.doctorId;
  const q = "SELECT * FROM patient WHERE doctorId = ?";
  db.query(q, [doctorId], (err, data) => {
    if (err) return res.json({ error: err.sqlMessage });
    return res.json({ data });
  });
});






// app.get("/products", (req, res) => {
//   const q = "select * from product";
//   db.query(q, (err, data) => {
//     console.log(err, data);
//     if (err) {
//       return res.json({ error: err.sqlMessage });
//     } else return res.json({ data });
//   });
// });

// app.post("/products", (req, res) => {
//   const q = `insert into product(productId, productTitle, productDescription, productPrice, availableQuantity, productThumbnail)
//       values(?)`;
//   const values = [...Object.values(req.body)];
//   console.log("insert", values);
//   db.query(q, [values], (err, data) => {
//     console.log(err, data);
//     if (err) {
//       return res.json({ error: err.sqlMessage });
//     } else return res.json({ data });
//   });
// });

// app.get("/products/:productId", (req, res) => {
//   const id = req.params.productId;
//   const q = "SELECT * FROM product where productId=?";
//   db.query(q, [id], (err, data) => {
//     console.log(err, data);
//     if (err) {
//       return res.json({ error: err.sqlMessage });
//     } else return res.json({ data });
//   });
// });

app.get("/doctors/:doctorId", (req, res) => {
  const id = req.params.doctorId;
  const q = "SELECT * FROM doctor where doctorId=?";
  db.query(q, [id], (err, data) => {
    console.log(err, data);
    if (err) {
      return res.json({ error: err.sqlMessage });
    } else return res.json({ data });
  });
});

// app.put("/products/:productId", (req, res) => {
//   const id = req.params.productId;
//   console.log("updated " + req.body);
//   const data = req.body;
//   if (data.productPrice) data.productPrice = Number.parseInt(data.productPrice);
//   if (data.availableQuantity)
//     data.availableQuantity = Number.parseInt(data.availableQuantity);
//   const q =
//     "update product set " +
//     Object.keys(data)
//       .map((k) => `${k} = ?`)
//       .join(",") +
//     " where productId='" +
//     id +
//     "'";
//   console.log(q);
//   db.query(q, [...Object.values(data)], (err, out) => {
//     console.log(err, out);
//     if (err) return res.json({ error: err.message });
//     else {
//       return res.json({ data: out });
//     }
//   });
// });

// app.delete("/products/:productId", (req, res) => {
//   const id = req.params.productId;
//   console.log("deleting " + id, req.body);
//   const { productThumbnail } = req.body;
//   console.log(req.body);
//   const q = `DELETE FROM product WHERE productId= ?`;
//   db.query(q, [id], (err, data) => {
//     console.log(err, data);
//     if (err) return res.json({ error: err.sqlMessage });
//     else res.json({ data });
//   });
// });

app.listen(8081, () => {
  console.log("listening on 8081");
});
