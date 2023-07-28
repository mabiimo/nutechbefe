const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const port = 5000;
const upload = multer();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
  user: "your_postgres_username",
  host: "localhost",
  database: "auth_db",
  password: "your_postgres_password",
  port: 5432,
});

app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image provided." });
  }

  const image = req.file.buffer;

  pool.query("INSERT INTO product (image) VALUES ($1) RETURNING *", [image], (error, results) => {
    if (error) {
      console.error("Error inserting image into database:", error);
      return res.status(500).json({ error: "Error inserting image into database." });
    }
    res.status(201).json({ message: "Image uploaded successfully.", product: results.rows[0] });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
