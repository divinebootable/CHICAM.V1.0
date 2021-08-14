/**
 * File: src/api_v1/controllers/vehicle.controller.js
 * Description: vehicle controller for chicam inventory system
 * Date: 14/08/2021
 * Author: Monyuy Divine Kongadzem
 */

const db = require("../../../data/db");

const createVehicle = (req, res) => {
  const { vehicle_name, created_on } = req.body;
  console.log(req.body);
  db("vehicle")
    .insert({ vehicle_name, created_on })
    .returning("*")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json({ Error: "bad request" }));
};

const getVehicle = (req, res) => {
  db.select("*")
    .from("vehicle")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json({ Error: "bad request" }));
};

const updateVehicle = (req, res) => {
  const { vehicle_id, vehicle_name } = req.body;
  db("vehicle")
    .select({ vehicle_id })
    .where(`vehicle_id`, vehicle_id)
    .then((data) => {
      //check if data exist
      if (data.length > 0) {
        db("vehicle")
          .update({ vehicle_name })
          .where(`vehicle_id`, vehicle_id)
          .returning("*")
          .then((data) => {
            res.json(data);
          });
      }
    })
    .catch((err) => res.status(400).json({ dbError: "bad request" }));
};

const deleteVehicle = (req, res) => {
  const { vehicle_id } = req.body;
  console.log(req.body);
  db("vehicle")
    .where({ vehicle_id })
    .del()
    .then(() => {
      res.json({ delete: "successful" });
    })
    .catch((err) => res.status(400).json({ dbError: "bad request" }));
};

module.exports = {
  createVehicle,
  getVehicle,
  updateVehicle,
  deleteVehicle,
};
