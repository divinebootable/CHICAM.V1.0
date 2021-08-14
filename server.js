/**
 * File: server.js
 * Description: api servies for chicam inventory system
 * Date: 12/08/20201
 * Author: Monyuy Divine Kongadzem
 */

const app = require("./src/app");
require("dotenv").config();

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("server is runing on port ", port);
});
