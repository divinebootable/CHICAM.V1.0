/**
 * File: src/route/product.js
 * Description: product routes for chicam inventory system
 * Date: 16/08/2021
 * Author: Monyuy Divine Kongadzem
 */

const router = require("express-promise-router")();
const productController = require("../api_v1/controllers/product.controller");

// ==> Defining routes for CRUD - 'product';

// ==> Route responsible for adding a new 'product':(POST ) localhost: 3000/api/add_product;
router.post("/add_product", productController.addProduct);
// router.get("/all_brands", brandController.getBrand);
// router.put("/update_brand", brandController.updateBrand);
// router.delete("/delete_brand", brandController.deleteBrand);

module.exports = router;