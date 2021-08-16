const express = require("express");
const cors = require("cors");
const fileupload = require("express-fileupload");

const app = express();

// ==> API Routes:
const index = require("./routes/index");
const categoryRoute = require("./routes/category.routes");
const brandRoute = require("./routes/brand.routes");
const vehicleRoute = require("./routes/vehicle.routes");
const accountRoute = require("./routes/account.routes");
const profileRoute = require("./routes/profile.routes");
const productRoute = require("./routes/product.routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: "application/vnd.api+json" }));
app.use(cors());
app.use(fileupload());
app.use("./uploads", express.static(__dirname + "./uploads"));

app.use(index);
app.use("/api/", categoryRoute);
app.use("/api/", brandRoute);
app.use("/api/", vehicleRoute);
app.use("/api/", accountRoute);
app.use("/api/", profileRoute);
app.use("/api/", productRoute);

module.exports = app;
