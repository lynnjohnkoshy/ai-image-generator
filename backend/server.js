const express = require("express");
const cors = require("cors"); // Allows backend and frontend to communicate even if they are on different ports (no stranger danger)

const PORT = 8080;
const app = express();

app.use(cors())
app.use(express.json()) // Allows to automatically read json (e.g., access like "req.body.name")

const path = require("path");
app.use("/", express.static(path.join(__dirname, "public")));
console.log("__dirname:", __dirname);

app.get("/api/test", (req, res) => {
    res.json({
        message: "Backend connected successfully 🚀",
    });
});

app.post("/api/test", (req, res) => {
  try {
    console.log(req.body);

    if (!req.body || !req.body.name) {
      return res.status(400).json({
        success: false,
        message: "Name is required"
      });
    }

    res.status(200).json({
      success: true,
      message: "Data received!",
      received: req.body
    });

  } catch (error) {
    console.error("Server error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});

app.listen(PORT, () => {
    console.log("Server started on port: " + PORT);
});