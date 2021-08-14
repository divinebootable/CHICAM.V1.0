/**
 * File: src/route/profile.js
 * Description: profile routes for chicam inventory system
 * Date: 14/08/2021
 * Author: Monyuy Divine Kongadzem
 */

const router = require("express-promise-router")();
const profileController = require("../api_v1/controllers/profile.controller");

// ==> Defining routes for CRUD - 'profile';

// ==> Route responsible for adding a new 'profile':(POST,GET, PUT, DELETE ) localhost: 3000/api/add_profile;
router.post("/add_profile", profileController.createProfile);
router.get("/all_profiles", profileController.getProfile);
router.put("/update_profile", profileController.updateProfile);
router.delete("/delete_profile", profileController.deleteProfile);

module.exports = router;
