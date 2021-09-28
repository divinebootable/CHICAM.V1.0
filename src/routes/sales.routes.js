/**
 * File: src/route/sales.js
 * Description: sales routes for chicam inventory system
 * Date: 19/08/2021
 * Author: Monyuy Divine Kongadzem
 */

const router = require("express-promise-router")();
const salesController = require("../api_v1/controllers/sales.controller");

// ==> Defining routes for CRUD - 'sales';

// ==> Route responsible for adding a new 'sales':(POST ) localhost: 3000/api/sales
router.post("/add_sales", salesController.createSales);
router.get("/sales/:users", salesController.getSalesByWarehouseId);
router.get("/all_sales", salesController.getAllSales);
router.get("/monthly_report", salesController.salesReportPerMonth);
router.put("/validate", salesController.validateSales);
router.put("/update_sales", salesController.updateSales);
//  router.delete("/delete_sales", salesController.deleteSales);

module.exports = router;
