const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./src/config/db");
const router = require("./src/routes/routes");
// const dotenv = require("dotenv");

// dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// MongoDB Connection
connectDB();

app.use('/api', router);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});