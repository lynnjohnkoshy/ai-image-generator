const express = require("express");

const app = express();
const PORT = 8080;

const path = require("path");

app.use("/", express.static(path.join(__dirname, "public")));
console.log("__dirname:", __dirname);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views/index.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "views/about.html"));
});

app.listen(PORT, () => {
    console.log("Server started on port: " + PORT);
});