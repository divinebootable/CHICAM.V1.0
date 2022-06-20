const express = require("express");
const cors = require("cors");
const fileupload = require("express-fileupload");

const app = express();

// ==> API Routes:
const index = require("./routes/index");
//const categoryRoute = require("./routes/category.routes");
const brandRoute = require("./routes/brand.routes");
const vehicleRoute = require("./routes/vehicle.routes");
const accountRoute = require("./routes/account.routes");
const profileRoute = require("./routes/profile.routes");
const productRoute = require("./routes/product.routes");
const transferRoute = require("./routes/transfers.routes");
const expensesRoute = require("./routes/expenses.routes");
const paymentRoute = require("./routes/payment.routes");
const salesRoute = require("./routes/sales.routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: "application/vnd.api+json" }));
app.use(cors());
app.use(fileupload());
app.use("./uploads", express.static(__dirname + "./uploads"));

app.use(index);
//app.use("/api/", categoryRoute);
app.use("/api/", brandRoute);
app.use("/api/", vehicleRoute);
app.use("/api/", accountRoute);
app.use("/api/", profileRoute);
app.use("/api/", productRoute);
app.use("/api/", transferRoute);
app.use("/api/", expensesRoute);
app.use("/api/", paymentRoute);
app.use("/api/", salesRoute);

module.exports = app;
