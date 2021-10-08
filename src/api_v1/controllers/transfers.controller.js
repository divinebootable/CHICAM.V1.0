/**
 * File: src/api_v1/controllers/transfers.controller.js
 * Description: transfers controller for chicam inventory system
 * Date: 19/08/2021
 * Author: Monyuy Divine Kongadzem
 */

const db = require("../../../data/db");

const createTranfer = (req, res) => {
  const { quantity, product, transfer_from, transfer_to, created_on } =
    req.body;
   db("products")
     .select("products.quantity")
     .where("products.product_id", product)
     .then((productQuantity)=>{
        if(parseInt(productQuantity[0].quantity) >= parseInt(quantity)){
           console.log(true)
         db.transaction((trx) => {
                trx
                 .insert({
                   quantity: quantity,
                    product: product,
                    transfer_from: transfer_from,
                    created_on: created_on,
                  })
                 .into("outgoingtransfers")
                  .returning("*")
                  .then((data) => {
                    return trx("incomingtransfers")
                     .insert({
                          quantity: quantity,
                         product: product,
                         transfer_to: transfer_to,
                         transfer_from: transfer_from,
                         created_on: created_on,
                        })
                      .returning("*")
                      .then((data) => {
                      res.status(200).json("transfer successful");
                     })
                      .catch((err) => res.status(400).json({ Error: "bad request" }));
                 })
                 .then(trx.commit)
                 .catch(trx.rollback);
             })
        
   }else{
      res.status(500)
   }
     })
     .catch((error)=> res.status(500).json({Error: "insufficient products"}))
};

const getTransferByWarehouseId = (req, res) => {
  const { users } = req.params;
  db("incomingtransfers")
    .join("products", "incomingtransfers.product", "=", "products.product_id")
    .join("users", "incomingtransfers.transfer_to", "=", "users.users_id")
    .select(
      "incomingtransfers.transfer_id",
      "incomingtransfers.quantity",
      "incomingtransfers.product",
      "incomingtransfers.transfer_state",
      "users.warehouse",
      "incomingtransfers.created_on"
    )
    .where("incomingtransfers.transfer_to", users)
    .where("incomingtransfers.transfer_state", false)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(400).json("Not found");
      }
    })
    .catch((err) => res.status(400).json({ Error: "bad request" }));
};

const getTransfersMadeByWarehouseId = (req, res) => {
  console.log(req.params)
  const { users } = req.params;
  db("outgoingtransfers")
    .join("products", "outgoingtransfers.product", "=", "products.product_id")
    .join("brand", "products.brand", "=", "brand.brand_id")
    .join("profile", "products.profile", "=", "profile.profile_id")
    .join("vehicle", "products.vehicle", "=", "vehicle.vehicle_id")
    .join("users", "outgoingtransfers.transfer_from", "=", "users.users_id")
    .select(
      "outgoingtransfers.quantity",
      "outgoingtransfers.product",
      "outgoingtransfers.transfer_state",
      "products.profile",
      "profile.profile_name",
      "products.vehicle",
      "vehicle.vehicle_name",
      "products.brand",
      "brand.brand_name",
      "users.warehouse",
      "outgoingtransfers.created_on"
    )
    .where("outgoingtransfers.transfer_from", users)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(400).json("Not found");
      }
    })
    .catch((err) => res.status(400).json({ Error: "bad request" }));
};

const getAllOutGoingTransfers = (req, res) => {
  db("outgoingtransfers")
    .join("products", "outgoingtransfers.product", "=", "products.product_id")
    .join("users", "outgoingtransfers.transfer_from", "=", "users.users_id")
    .select(
      "outgoingtransfers.transfer_id",
      "outgoingtransfers.quantity",
      "outgoingtransfers.product",
      "outgoingtransfers.transfer_state",
      "users.warehouse",
      "outgoingtransfers.created_on"
    )
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(400).json("Not found");
      }
    })
    .catch((err) => res.status(400).json({ Error: "bad request" }));
};

const getAllIncomingTransfers = (req, res) => {
  db("incomingtransfers")
    .join("products", "incomingtransfers.product", "=", "products.product_id")
    .join("users", "incomingtransfers.transfer_to", "=", "users.users_id")
    .select(
      "incomingtransfers.transfer_id",
      "incomingtransfers.quantity",
      "incomingtransfers.product",
      "incomingtransfers.transfer_state",
      "users.warehouse",
      "incomingtransfers.created_on"
    )
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(400).json("Not found");
      }
    })
    .catch((err) => res.status(400).json({ Error: "bad request" }));
};

const validateTransfer = (req, res) => {
  db.transaction((trx) => {
    trx("incomingtransfers")
      .update({ transfer_state: true })
      .where("transfer_id", req.body.transfer_id)
      .then((data) => {
        return trx("outgoingtransfers")
          .where("product", req.body.product)
          .update({ transfer_state: true })
          .then((data) => {
            res.status(200).json();
          })
          .catch((err) => console.log(err));
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => console.log(err));
};

module.exports = {
  createTranfer,
  getTransferByWarehouseId,
  getTransfersMadeByWarehouseId,
  getAllOutGoingTransfers,
  getAllIncomingTransfers,
  validateTransfer,
};
