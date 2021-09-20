/**
 * File: src/route/transfers.js
 * Description: transfer routes for chicam inventory system
 * Date: 21/08/2021
 * Author: Monyuy Divine Kongadzem
 */

const router = require("express-promise-router")();
const transferController = require("../api_v1/controllers/transfers.controller");

// ==> Defining routes for CRUD - 'sales';

// ==> Route responsible for adding a new 'sales':(POST ) localhost: 3000/api/sales
router.post("/add_transfer", transferController.createTranfer);
router.get("/transfer/:users", transferController.getTransferByWarehouseId);
router.get("/transfer_made/:users", transferController.getTransfersMadeByWarehouseId);
router.get("/all_transfers", transferController.getAllTransfers);

// work still to be done yeah if possible separate validateds transfer from non-validated transfer.

module.exports = router;
