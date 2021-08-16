/**
 * File: src/api_v1/controllers/profuct.controller.js
 * Description: product controller for chicam inventory system
 * Date: 16/08/2021
 * Author: Monyuy Divine Kongadzem
 */

const db = require("../../../data/db");

const addProduct = (req, res) => {
  const {
    size,
    price,
    quantity,
    category,
    users,
    brand,
    profile,
    vehicle,
    filepath,
    created_on,
  } = req.body;
  console.log(req.body);
  db("products")
    .insert({
      size,
      price,
      quantity,
      category,
      users,
      brand,
      profile,
      vehicle,
      filepath,
      created_on,
    })
    .returning("*")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).json({ Error: "bad request" }));
};

module.exports = {
  addProduct,
};
