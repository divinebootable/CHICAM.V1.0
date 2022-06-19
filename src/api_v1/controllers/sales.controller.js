/**
 * File: src/api_v1/controllers/sales.controller.js
 * Description: sales controller for chicam inventory system
 * Date: 17/08/2021
 * Author: Monyuy Divine Kongadzem
 */

//const { returning } = require("../../../data/db");
const db = require("../../../data/db");

const createSales = (req, res) => {
  const {
    customer_name,
    customer_phone,
    customer_address,
    quantity,
    product,
    users,
    sales_price,
    created_on,
  } = req.body;
  console.log(req.body);
  db("products")
    .select("products.quantity")
    .where("products.product_id", product)
    .then((productQuantity) => {
      if (parseInt(productQuantity[0].quantity) > parseInt(quantity)) {
        db("sales")
          .insert({
            customer_name,
            customer_phone,
            customer_address,
            quantity,
            product,
            users,
            sales_price,
            created_on,
          })
          .returning("*")
          .then((data) => {
            res.json(data);
          })
          .catch((err) => res.status(400).json({ Error: "bad request" }));
      } else {
        res.status(500).json("insufficient products");
      }
    })
    .catch((err) => res.status(500).json({ Error: "bad request" }));
};

// get all sales based on warehouse id

const getSalesByWarehouseId = (req, res) => {
  const { users } = req.params;
  db("sales")
    .join("products", "sales.product", "=", "products.product_id")
    .join("brand", "products.brand", "=", "brand.brand_id")
    .join("profile", "products.profile", "=", "profile.profile_id")
    .join("vehicle", "products.vehicle", "=", "vehicle.vehicle_id")
    .join("category", "products.category", "=", "category.category_id")
    .join("users", "sales.users", "=", "users.users_id")
    .select(
      "sales.sales_id",
      "sales.users",
      "sales.customer_name",
      "sales.customer_phone",
      "sales.customer_address",
      "sales.quantity",
      "sales.sales_price",
      "sales.sales_status",
      "products.price",
      //"products.quantity",
      "products.profile",
      "profile.profile_name",
      "products.vehicle",
      "vehicle.vehicle_name",
      "products.brand",
      "brand.brand_name",
      "products.category",
      "category.category",
      "products.product_id",
      "users.warehouse",
      "sales.created_on"
    )
    .where("sales.users", users)
    .then((data) => {
      console.log(data + "sales");
      if (data.length > 0) {
        res.status(200).json(data);
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
    .join("brand", "products.brand", "=", "brand.brand_id")
    .join("profile", "products.profile", "=", "profile.profile_id")
    .join("vehicle", "products.vehicle", "=", "vehicle.vehicle_id")
    .join("category", "products.category", "=", "category.category_id")
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
      "profile.profile_name",
      "products.vehicle",
      "vehicle.vehicle_name",
      "products.brand",
      "brand.brand_name",
      "products.category",
      "category.category",
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
  db.raw(
    `select sales.sales_id,sales.customer_name,sales.customer_phone,
  sales.customer_address,sales.quantity,sales.sales_price,sales.sales_status,
  products.product_id,products.price,products.profile,profile.profile_name,products.vehicle,vehicle.vehicle_name,products.brand,brand.brand_name,
  products.product_id,users.warehouse,sales.created_on from sales 
  join products on sales.product = products.product_id
  join brand on products.brand = brand.brand_id
  join profile on products.profile = profile.profile_id
  join vehicle on products.vehicle = vehicle.vehicle_id
  join users on sales.users = users.users_id
  where sales.created_on > current_date - interval '29 days'
  ORDER BY sales.created_on DESC
  `
  )
    .then((sales) => {
      res.json(sales);
    })
    .catch((err) => res.status(400).json({ Error: "bad request" }));
};

const salesReportPerWeek = (req, res) => {
  db.raw(
    `select sales.sales_id,sales.customer_name,sales.customer_phone,
    sales.customer_address,sales.quantity,sales.sales_price,sales.sales_status,
    products.product_id,products.price,products.profile,profile.profile_name,products.vehicle,vehicle.vehicle_name,products.brand,brand.brand_name,
    products.product_id,users.warehouse,sales.created_on from sales 
    join products on sales.product = products.product_id
    join brand on products.brand = brand.brand_id
    join profile on products.profile = profile.profile_id
    join vehicle on products.vehicle = vehicle.vehicle_id
    join users on sales.users = users.users_id
  where sales.created_on > current_date - interval '6 days'
  ORDER BY sales.created_on DESC
  `
  )
    .then((sales) => {
      res.json(sales);
    })
    .catch((err) => res.status(400).json({ Error: "bad request" }));
};

const salesReportPerday = (req, res) => {
  db.raw(
    `select sales.sales_id,sales.customer_name,sales.customer_phone,
    sales.customer_address,sales.quantity,sales.sales_price,sales.sales_status,
    products.product_id,products.price,products.profile,profile.profile_name,products.vehicle,vehicle.vehicle_name,products.brand,brand.brand_name,
    products.product_id,users.warehouse,sales.created_on from sales 
    join products on sales.product = products.product_id
    join brand on products.brand = brand.brand_id
    join profile on products.profile = profile.profile_id
    join vehicle on products.vehicle = vehicle.vehicle_id
    join users on sales.users = users.users_id
  where sales.created_on BETWEEN NOW() - INTERVAL '24 HOURS' AND NOW()
  ORDER BY sales.created_on DESC
  `
  )
    .then((sales) => {
      res.json(sales);
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

const getTotalOfAllSalesPerWarehouse = (req, res) => {
  db.raw(
    `select sum(sales_id), users.warehouse from sales join users on sales.users=users.users_id group by users.warehouse`
  )
    .then((sales) => {
      res.json(sales);
    })
    .catch((err) => res.status(400).json({ Error: "bad request" }));
};

const totalNumberOfSales = (req, res) => {
  db.raw(`select sum(sales_id) from sales`)
    .then((sales) => {
      res.json(sales);
    })
    .catch((err) => res.status(400).json({ Error: "bad request" }));
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
  totalNumberOfSales,
  getTotalOfAllSalesPerWarehouse,
};
