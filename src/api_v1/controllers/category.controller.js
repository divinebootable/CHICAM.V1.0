/**
 * File: src/api_v1/controllers/category.controller.js
 * Description: category controller for chicam inventory system
 * Date: 14/08/2021
 * Author: Monyuy Divine Kongadzem
 */

const db = require("../../../data/db");

const createCategory = (req, res) => {
  const { category, created_on } = req.body;
  console.log(req.body);
  db("category")
    .insert({ category, created_on })
    .returning("*")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json({ Error: "bad request" }));
};

const getCategory = (req, res) => {
  db.select("*")
    .from("category")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json({ Error: "bad request" }));
};

const updateCategory = (req, res) => {
  const { category_id, category } = req.body;
  db("category")
    .select({ category_id })
    .where(`category_id`, category_id)
    .then((data) => {
      //check if data exist
      if (data.length > 0) {
        db("category")
          .update({ category })
          .where(`category_id`, category_id)
          .returning("*")
          .then((data) => {
            res.json(data);
          });
      }
    })
    .catch((err) => res.status(400).json({ dbError: "bad request" }));
};

const deleteCategory = (req, res) => {
  const { category_id } = req.body;
  console.log(req.body);
  db("category")
    .where({ category_id })
    .del()
    .then(() => {
      res.json({ delete: "successful" });
    })
    .catch((err) => res.status(400).json({ dbError: "bad request" }));
};

module.exports = {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
