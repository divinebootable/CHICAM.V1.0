/**
 * File: src/api_v1/controllers/sales.controller.js
 * Description: sales controller for chicam inventory system
 * Date: 17/08/2021
 * Author: Monyuy Divine Kongadzem
 */

const { returning } = require("../../../data/db");
const db = require("../../../data/db");

const createSales = (req, res) => {
  const {
    customer_name,
    customer_phone,
    customer_address,
    quantity,
    product,
    users,
    created_on,
  } = req.body;
  console.log(req.body);
  db("sales")
    .insert({
      customer_name,
      customer_phone,
      customer_address,
      quantity,
      product,
      users,
      created_on,
    })
    .returning("*")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json({ Error: "bad request" }));
};

// get all sales based on warehouse id

const getSalesByWarehouseId = (req, res) => {
  const { users } = req.params;
  db("sales")
    .join("products", "sales.product", "=", "products.product_id")
    .join("users", "sales.users", "=", "users.users_id")
    .select(
      "sales.sales_id",
      "sales.customer_name",
      "sales.customer_phone",
      "sales.customer_address",
      "sales.quantity",
      "sales.sales_price",
      "sales.sales_status",
      "products.product_id",
      "products.price",
      "products.quantity",
      "products.profile",
      "products.vehicle",
      "products.brand",
      "products.product_id",
      "users.warehouse",
      "users.username",
      "sales.created_on"
    )
    .where("sales.users", users)
    .then((sales) => {
      if (sales) {
        res.status(200).json(sales);
      } else {
        res.status(400).json("Not found");
      }
    })
    .catch((err) => res.status(400).json({ Error: "bad request" }));
};

// get all sales

const getAllSales = (req, res) => {
  db("sales")
    .join("products", "sales.product", "=", "products.product_id")
    .join("users", "sales.users", "=", "users.users_id")
    .select(
      "sales.sales_id",
      "sales.customer_name",
      "sales.customer_phone",
      "sales.customer_address",
      "sales.quantity",
      "sales.sales_price",
      "sales.sales_status",
      "products.product_id",
      "products.price",
      //"products.quantity",
      "products.profile",
      "products.vehicle",
      "products.brand",
      "products.category",
      "products.product_id",
      "users.warehouse",
      "sales.created_on"
    )
    .then((sales) => {
      if (sales) {
        res.status(200).json(sales);
      } else {
        res.status(400).json("Not found");
      }
    })
    .catch((err) => res.status(400).json({ Error: "bad request" }));
};

const salesReportPerMonth = (req, res) => {
  const currentdate = new Date();
  const days = 30;
  const compareDate = currentdate.setDate(currentdate.getDate() - days);
  db.raw(
    `select sales.sales_id,sales.customer_name,sales.customer_phone,
  sales.customer_address,sales.quantity,sales.sales_price,sales.sales_status,
  products.product_id,products.price,products.profile,products.vehicle,products.brand,
  products.product_id,users.warehouse,sales.created_on from sales 
  join products on sales.product = products.product_id
  join users on sales.users = users.users_id
  where sales.created_on > current_date - interval '29 days'
  `
  )
    .then((product) => {
      res.json(product);
    })
    .catch((err) => res.status(400).json({ Error: "bad request" }));
};

const salesReportPerWeek = (req, res) => {
  db.raw(
    `select * from sales where returned_date > current_date - interval '7 days'
  `
  )
    .then((product) => {
      res.json(product);
    })
    .catch((err) => res.status(400).json({ Error: "bad request" }));
};

const salesReportPerday = (req, res) => {
  db.raw(``)
    .then((product) => {
      res.json(product);
    })
    .catch((err) => res.status(400).json({ Error: "bad request" }));
};

//validate sales

const validateSales = (req, res) => {
  var number = req.body.quantity;
  db.transaction((trx) => {
    trx("sales")
      .update({ sales_status: true })
      .where("sales_id", req.body.sales_id)
      .then((data) => {
        return trx("products")
          .where("product_id", req.body.product)
          .update({
            quantity: db.raw(`?? - ${number} `, ["quantity"]),
          })
          .then((sales) => {
            console.log(sales);
            res.status(200).json("sales validated");
          })
          .catch((err) => console.log(err));
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => console.log(err));
};

const updateSales = (req, res) => {
  const {
    sales_id,
    customer_name,
    customer_phone,
    customer_address,
    quantity,
    product,
    users,
  } = req.body;
  db("sales")
    .select({ sales_id })
    .where(`sales_id`, sales_id)
    .then((data) => {
      //check if data exist
      if (data.length > 0) {
        db("sales")
          .update({
            customer_name,
            customer_phone,
            customer_address,
            quantity,
            product,
            users,
          })
          .where(`sales_id`, sale_id)
          .returning("*")
          .then((data) => {
            res.json(data);
          });
      } else {
        res.status(400).json("data not found");
      }
    })
    .catch((err) => res.status(400).json({ dbError: "bad request" }));
};

module.exports = {
  createSales,
  getSalesByWarehouseId,
  getAllSales,
  validateSales,
  updateSales,
  salesReportPerWeek,
  salesReportPerday,
  salesReportPerMonth,
};
