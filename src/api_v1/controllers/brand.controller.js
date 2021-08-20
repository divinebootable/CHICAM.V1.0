/**
 * File: src/api_v1/controllers/brand.controller.js
 * Description: brand controller for chicam inventory system
 * Date: 14/08/2021
 * Author: Monyuy Divine Kongadzem
 */

const db = require("../../../data/db");

const createBrand = (req, res) => {
  const { brand_name, created_on } = req.body;
  console.log(req.body);
  db("brand")
    .insert({ brand_name, created_on })
    .returning("*")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json({ Error: "bad request" }));
};

const getBrand = (req, res) => {
  db.select("*")
    .from("brand")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json({ Error: "bad request" }));
};

const updateBrand = (req, res) => {
  const { brand_id, brand_name } = req.body;
  db("brand")
    .select({ brand_id })
    .where(`brand_id`, brand_id)
    .then((data) => {
      //check if data exist
      if (data.length > 0) {
        db("brand")
          .update({ brand_name })
          .where(`brand_id`, brand_id)
          .returning("*")
          .then((data) => {
            res.json(data);
          });
      } else {
        res.status(400).json(" data not found");
      }
    })
    .catch((err) => res.status(400).json({ dbError: "bad request" }));
};

const deleteBrand = (req, res) => {
  const { brand_id } = req.body;
  console.log(req.body);
  db("brand")
    .where({ brand_id })
    .del()
    .then(() => {
      res.json({ delete: "successful" });
    })
    .catch((err) => res.status(400).json({ dbError: "bad request" }));
};

module.exports = {
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
};
