/**
 * File: src/route/vehicle.js
 * Description: vehicle routes for chicam inventory system
 * Date: 14/08/2021
 * Author: Monyuy Divine Kongadzem
 */

const router = require("express-promise-router")();
const vehicleController = require("../api_v1/controllers/vehicle.controller");

// ==> Defining routes for CRUD - 'vehicle';

// ==> Route responsible for adding a new 'vehicle':(POST ) localhost: 3000/api/add_vehicle;
router.post("/add_vehicle", vehicleController.createVehicle);
router.get("/all_vehicles", vehicleController.getVehicle);
router.put("/update_vehicle", vehicleController.updateVehicle);
router.delete("/delete_vehicle", vehicleController.deleteVehicle);

module.exports = router;
