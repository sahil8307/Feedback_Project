const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
     host: "localhost",
    user: "root",
   password: "Sahil@7015",
    database: "feedback_db"
});

db.connect(err => {
      if (err) throw err;
    console.log("MySQL Connected...");
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

app.listen(3000, () => console.log("Server running on port 3000"));
