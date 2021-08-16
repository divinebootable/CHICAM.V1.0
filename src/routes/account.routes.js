/**
 * File: src/route/account.js
 * Description: account routes for chicam inventory system
 * Date: 16/08/2021
 * Author: Monyuy Divine Kongadzem
 */

const validateInputData = require("../api_v1/middlewares/validateLoginCredentials");

const router = require("express-promise-router")();
const accountController = require("../api_v1/controllers/account.controller");

// ==> Defining routes for CRUD - 'account';

// ==> Route responsible for adding a new 'category':(POST ) localhost: 3000/api/account;
router.post("/signIn", validateInputData, accountController.signIn);
router.post("/add_account", accountController.createAccount);
router.get("/all_accounts", accountController.getAllAccounts);
router.put("/block_account", accountController.blockAccount);
//  router.delete("/delete_brand", brandController.deleteBrand);

module.exports = router;
