/**
 * File: src/api_v1/controllers/payments.controller.js
 * Description: payment controller for chicam inventory system
 * Date: 20/08/2021
 * Author: Monyuy Divine Kongadzem
 */

const db = require("../../../config/db");

const createPayment = (req, res) => {
  const { amount_paid, pending_amount, users, sales, created_on } = req.body;
  console.log(req.body);
  db("expenses")
    .insert({
      amount_paid,
      pending_amount,
      users,
      sales,
      created_on,
    })
    .returning("*")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json({ Error: "bad request" }));
};

const getPaymentByWarehouseId = (req, res) => {
  const { users } = req.params;
  db("payments")
    .join("users", "payments.users", "=", "users.users_id")
    .join("sales", "payments.sales", "=", "sales.sales_id")
    .select(
      "payments.payment_id",
      "payments.amount_paid",
      "payments.pending_amount",
      "payments.pending_status",
      "users.warehouse",
      "users.username",
      "sales.customer_name",
      "sales.product",
      "sales.quantity",
      "sales.sales_price",
      "payments.created_on"
    )
    .where("payments.users", users)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(400).json("Not found");
      }
    })
    .catch((err) => res.status(400).json({ Error: "bad request" }));
};

const getAllPayments = (req, res) => {
  db("payments")
    .join("users", "payments.users", "=", "users.users_id")
    .join("sales", "payments.sales", "=", "sales.sales_id")
    .select(
      "payments.payment_id",
      "payments.amount_paid",
      "payments.pending_amount",
      "payments.pending_status",
      "users.warehouse",
      "users.username",
      "sales.customer_name",
      "sales.product",
      "sales.quantity",
      "sales.sales_price",
      "payments.created_on"
    )
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(400).json("Not found");
      }
    })
    .catch((err) => res.status(400).json({ Error: "bad request" }));
};

const updateExpense = (req, res) => {
  const { expenses_id, expense, amount } = req.body;
  db("expenses")
    .select({ expenses_id })
    .where(`expenses_id`, expenses_id)
    .then((data) => {
      //check if data exist
      if (data.length > 0) {
        db("expenses")
          .update({ expense, amount })
          .where(`expenses_id`, expenses_id)
          .returning("*")
          .then((data) => {
            res.json(data);
          });
      }
    })
    .catch((err) => res.status(400).json({ dbError: "bad request" }));
};

const deleteExpense = (req, res) => {
  const { expenses_id } = req.body;
  db("expenses")
    .select({ expenses_id })
    .where({ expenses_id })
    .then((data) => {
      if (data) {
        db("expenses")
          .update({ is_delete: true })
          .where("expenses_id", expenses_id)
          .returning("*")
          .then((data) => {
            res, status(200).json(data);
          })
          .catch((err) => res.status(400).json({ dbError: "bad request" }));
      } else {
        res.status(400).json("Not found");
      }
    })
    .catch((err) => res.status(400).json({ dbError: "bad request" }));
};

module.exports = {
  createPayment,
  getPaymentByWarehouseId,
  getAllPayments,
};
