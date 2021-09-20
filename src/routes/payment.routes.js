/**
 * File: src/route/payments.js
 * Description: payment routes for chicam inventory system
 * Date: 21/08/2021
 * Author: Monyuy Divine Kongadzem
 */

const router = require("express-promise-router")();
const paymentController = require("../api_v1/controllers/payments.controller");

// ==> Defining routes for CRUD - 'payment';

// ==> Route responsible for adding a new 'payment':(POST ) localhost: 3000/api/payment
router.post("/add_payment", paymentController.createPayment);
router.get("/payment/:users", paymentController.getPaymentByWarehouseId);
//  router.get("/all_transfers", transferController.getAllTransfers);

// work still to be done yeah if possible separate validateds transfer from non-validated transfer.

module.exports = router;
