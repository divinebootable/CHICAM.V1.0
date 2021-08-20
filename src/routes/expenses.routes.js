/**
 * File: src/route/expenses.js
 * Description: expense routes for chicam inventory system
 * Date: 19/08/2021
 * Author: Monyuy Divine Kongadzem
 */

const router = require("express-promise-router")();
const expenseController = require("../api_v1/controllers/expense.controller");

// ==> Defining routes for CRUD - 'expense';

// ==> Route responsible for adding a new 'expense':(POST ) localhost: 3000/api/expense;
router.post("/add_expense", expenseController.createExpense);
router.get("/expenses/:users", expenseController.getExpenseByWarehouseId);
router.get("/all_expenses", expenseController.getAllExpenses);
router.put("/update_expense", expenseController.updateExpense);
router.delete("/delete_expense", expenseController.deleteExpense);

module.exports = router;
