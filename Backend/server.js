const fs = require('fs');
require('dotenv').config();

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    ca: fs.readFileSync('./ca.pem') 
  }
});


db.connect((err) => {
  if (err) {
    console.error('Connection failed:', err.message);
    return;
  }
  console.log('Successfully connected to Aiven!');
});

const createTableSql = `
  CREATE TABLE IF NOT EXISTS feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    message TEXT,
    rating INT
  )
`;

db.query(createTableSql, (err) => {
  if (err) {
    console.error('Table creation failed:', err);
    return;
  }
});

app.post("/submit", (req, res) => {
    const { name, message, rating } = req.body;

    const sql = "INSERT INTO feedback (name, message, rating) VALUES (?, ?, ?)";
  db.query(sql, [name, message, rating], (err, result) => {
        if (err) throw err;
        res.send("Feedback submitted successfully!");
    });
});

app.get("/feedbacks", (req, res) => {
    db.query("SELECT * FROM feedback ORDER BY id DESC", (err, result) => {
        if (err) {
           console.log(err);
            return res.send("Error fetching data");
        }
          res.json(result);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));