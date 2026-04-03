const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/posts"));

app.get("/", (req, res) => res.json({ message: "Communify API running!" }));

const MONGO = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

console.log("ENV CHECK:", MONGO);

mongoose
  .connect(MONGO, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  })
  .then(() => {
    console.log("✅ MongoDB Connected!");
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.log("❌ DB Error:", err.message);
  });
