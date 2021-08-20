/**
 * File: src/api_v1/controllers/transfers.controller.js
 * Description: transfers controller for chicam inventory system
 * Date: 19/08/2021
 * Author: Monyuy Divine Kongadzem
 */

const db = require("../../../data/db");

const createTranfer = (req, res) => {
  const { quantity, product, transfer_from, transfer_to, created_on } =
    req.body;
  db("transfers")
    .insert({ quantity, product, transfer_from, transfer_to, created_on })
    .returning("*")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).json({ Error: "bad request" }));
};

const getTransferByWarehouseId = (req, res) => {
  const { users } = req.params;
  db("transfers")
    .join("products", "transfers.product", "=", "products.product_id")
    .join("users", "transfers.transfer_to", "=", "users.users_id")
    .join("users", "transfers.transfer_from", "=", "users.users_id")
    .select(
      "transfers.transfer_id",
      "transfers.quantity",
      "transfers.product",
      "transfers.transfer_state",
      "users.warehouse",
      "transfers.created_on"
    )
    .where("transfers.transfer_to", users)
    .where("transfers.transfer_state", false)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(400).json("Not found");
      }
    })
    .catch((err) => res.status(400).json({ Error: "bad request" }));
};

const getAllTransfers = (req, res) => {
  db("transfers")
    .select("*")
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(400).json("Not found");
      }
    })
    .catch((err) => res.status(400).json({ Error: "bad request" }));
};

module.exports = {
  createTranfer,
  getTransferByWarehouseId,
  getAllTransfers,
};
