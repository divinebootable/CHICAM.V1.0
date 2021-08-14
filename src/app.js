const express = require("express");
const cors = require("cors");

const app = express();

// ==> API Routes:
const index = require("./routes/index");
const categoryRoute = require("./routes/category.routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: "application/vnd.api+json" }));
app.use(cors());

app.use(index);
app.use("/api/", categoryRoute);

module.exports = app;
