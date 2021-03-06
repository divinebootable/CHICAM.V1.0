/**
 * File: src/route/product.js
 * Description: product routes for chicam inventory system
 * Date: 16/08/2021
 * Author: Monyuy Divine Kongadzem
 */

const router = require("express-promise-router")();
const productController = require("../api_v1/controllers/product.controller");
const fileUpload = require("../api_v1/middlewares/fileUpload");

// ==> Defining routes for CRUD - 'product';

// ==> Route responsible for adding a new 'product':(POST ) localhost: 3000/api/add_product;
router.post("/add_product", fileUpload, productController.addProduct);
router.get("/products/:users", productController.getProductsByWarehouseId);
router.get("/all_products", productController.getAllproducts);
router.get("/products_total", productController.totalNumberOfproducts);
router.get("/products_total_per_warehouse", productController.getTotalOfAllProductsPerWarehouse);
router.put("/update_product", productController.updateProduct);

module.exports = router;
