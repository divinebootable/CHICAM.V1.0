/**
 * File: src/api_v1/controllers/profuct.controller.js
 * Description: product controller for chicam inventory system
 * Date: 16/08/2021
 * Author: Monyuy Divine Kongadzem
 */

const db = require("../../../data/db");

const addProduct = (req, res) => {
  const {
    size,
    price,
    quantity,
    category,
    users,
    brand,
    profile,
    vehicle,
    filepath,
    created_on,
  } = req.body;
  db("products")
    .insert({
      size,
      price,
      quantity,
      category,
      users,
      brand,
      profile,
      vehicle,
      filepath,
      created_on,
    })
    .returning("*")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).json({ Error: "bad request" }));
};

// get products for each warehouse.

const getProductsByWarehouseId = (req, res) => {
  const { users } = req.params;
  console.log(req.params);
  db("products")
    .join("category", "products.category", "=", "category.category_id")
    .join("brand", "products.brand", "=", "brand.brand_id")
    .join("profile", "products.profile", "=", "profile.profile_id")
    .join("vehicle", "products.vehicle", "=", "vehicle.vehicle_id")
    .select(
      "products.product_id",
      "products.size",
      "products.price",
      "products.quantity",
      "products.filepath",
      "category.category",
      "brand.brand_name",
      "profile.profile_name",
      "vehicle.vehicle_name",
      "products.created_on"
    )
    .where("products.users", users)
    .where("products.is_delete", false)
    .then((product) => {
      if (product.length) {
        res.json(product);
      } else {
        res.status(400).json("Not found");
      }
    })
    .catch((err) => res.status(400).json({ Error: "bad request" }));
};

const getAllproducts = (req, res) => {
  db("products")
    .join("category", "products.category", "=", "category.category_id")
    .join("brand", "products.brand", "=", "brand.brand_id")
    .join("profile", "products.profile", "=", "profile.profile_id")
    .join("vehicle", "products.vehicle", "=", "vehicle.vehicle_id")
    .select(
      "products.product_id",
      "products.size",
      "products.price",
      "products.quantity",
      "products.filepath",
      "category.category",
      "brand.brand_name",
      "profile.profile_name",
      "vehicle.vehicle_name",
      "products.created_on"
    )
    .where("products.is_delete", false)
    .then((product) => {
      if (product.length) {
        res.json(product);
      } else {
        res.status(400).json("Not found");
      }
    })
    .catch((err) => res.status(400).json({ Error: "bad request" }));
};

module.exports = {
  addProduct,
  getProductsByWarehouseId,
  getAllproducts,
};
