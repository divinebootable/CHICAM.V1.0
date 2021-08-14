/**
 * File: src/route/brand.js
 * Description: brand routes for chicam inventory system
 * Date: 14/08/2021
 * Author: Monyuy Divine Kongadzem
 */

const router = require("express-promise-router")();
const brandController = require("../api_v1/controllers/brand.controller");

// ==> Defining routes for CRUD - 'brand';

// ==> Route responsible for adding a new 'category':(POST ) localhost: 3000/api/add_brand;
router.post("/add_brand", brandController.createBrand);
router.get("/all_brands", brandController.getBrand);
router.put("/update_brand", brandController.updateBrand);
router.delete("/delete_brand", brandController.deleteBrand);

module.exports = router;
