/**
 * File: src/api_v1/controllers/expense.controller.js
 * Description: expense controller for chicam inventory system
 * Date: 18/08/2021
 * Author: Monyuy Divine Kongadzem
 */

const db = require("../../../config/db");

const createExpense = (req, res) => {
  const { expense, amount, users, created_on } = req.body;
  console.log(req.body);
  db("expenses")
    .insert({ expense, amount, users, created_on })
    .returning("*")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json({ Error: "bad request" }));
};

const getExpenseByWarehouseId = (req, res) => {
  const { users } = req.params;
  db("expenses")
    .join("users", "expenses.users", "=", "users.users_id")
    .select(
      "expenses.expenses_id",
      "expenses.expense",
      "expenses.amount",
      "users.warehouse",
      "users.username",
      "expenses.created_on"
    )
    .where("expenses.users", users)
    .where("expenses.is_delete", false)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(400).json("Not found");
      }
    })
    .catch((err) => res.status(400).json({ Error: "bad request" }));
};

const getAllExpenses = (req, res) => {
  db("expenses")
    .join("users", "expenses.users", "=", "users.users_id")
    .select(
      "expenses.expenses_id",
      "expenses.expense",
      "expenses.amount",
      "users.warehouse",
      "users.username",
      "expenses.created_on",
      "expenses.is_delete"
    )
    .where("expenses.is_delete", false)
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
  createExpense,
  getExpenseByWarehouseId,
  getAllExpenses,
  updateExpense,
  deleteExpense,
};
