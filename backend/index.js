const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.post("/data", (req, res) => {
  const data = req.body;
  res.json({ message: "Data received", data });
});

//Start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
