/**
 * File: src/api_v1/controllers/profuct.controller.js
 * Description: product controller for chicam inventory system
 * Date: 16/08/2021
 * Author: Monyuy Divine Kongadzem
 */

const db = require("../../../config/db");

const addProduct = (req, res) => {
  const {
    product_name,
    code,
    size,
    price,
    quantity,
    category,
    users,
    brand,
    filepath,
    created_on,
  } = req.body;
  db("products")
    .insert({
      product_name,
      code,
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
      "products.code",
      "products.product_name",
      "products.product_id",
      "products.size",
      "products.price",
      "products.quantity",
      "products.filepath",
      "category.category",
      "brand.brand_name",
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
    .join("users", "products.users", "=", "users.users_id")
    .select(
      "products.code",
      "products.product_name",
      "products.product_id",
      "products.size",
      "products.price",
      "products.quantity",
      "products.filepath",
      "category.category",
      "category.category_id",
      "brand.brand_name",
      "brand.brand_id",
      "products.created_on",
      "users.warehouse",
      "users.users_id"
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

const getTotalOfAllProductsPerWarehouse = (req, res) => {
  db.raw(
    `select sum(quantity), users.warehouse from products join users on products.users=users.users_id group by users.warehouse`
  )
    .then((product) => {
      res.json(product);
    })
    .catch((err) => res.status(400).json({ Error: "bad request" }));
};

const totalNumberOfproducts = (req, res) => {
  db.raw(`select sum(quantity) from products`)
    .then((product) => {
      res.json(product);
    })
    .catch((err) => res.status(400).json({ Error: "bad request" }));
};

const updateProduct = (req, res) => {
  const {
    product_id,
    product_name,
    code,
    size,
    price,
    quantity,
    category,
    users,
    brand,
    filepath,
  } = req.body;
  console.log(req.body);
  db("products")
    .select({ product_id })
    .where(`product_id`, product_id)
    .then((data) => {
      if (data.length) {
        db("products")
          .update({
            product_name,
            code,
            size,
            price,
            quantity,
            category,
            users,
            vehicle,
            filepath,
          })
          .where("product_id", product_id)
          .where("is_delete", false)
          .returning("*")
          .then((data) => {
            res.json(data);
          })
          .catch((err) => res.status(400).json({ Error: "bad request" }));
      } else {
        res.status(400).json("bad request");
      }
    })
    .catch((err) => res.status(400).json({ Error: "bad request" }));
};

module.exports = {
  addProduct,
  getProductsByWarehouseId,
  getAllproducts,
  updateProduct,
  totalNumberOfproducts,
  getTotalOfAllProductsPerWarehouse,
};
