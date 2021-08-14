/**
 * File: src/route/category.js
 * Description: category routes for chicam inventory system
 * Date: 12/08/20201
 * Author: Monyuy Divine Kongadzem
 */

const router = require("express-promise-router")();
const categoryController = require("../api_v1/controllers/category.controller");

// ==> Defining routes for CRUD - 'category';

// ==> Route responsible for adding a new 'category':(POST ) localhost: 3000/api/categories;
router.post("/categories", categoryController.createCategory);
router.get("/all_categories", categoryController.getCategory);
router.put("/update_category", categoryController.updateCategory);
router.delete("/delete_category", categoryController.deleteCategory);

module.exports = router;
