/**
 * File: src/api_v1/controllers/account.controller.js
 * Description: account controller for chicam inventory system
 * Date: 14/08/2021
 * Author: Monyuy Divine Kongadzem
 */

const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const db = require("../../../data/db");

const getAllAccounts = (req, res) => {
  db.select("*")
    .from("users")
    .where("is_delete", false)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json({ Error: "bad request" }));
};

const getAllAccountsById = (req, res) => {
  const { users } = req.params;
  db.select("*")
    .from("users")
    .where("is_delete", false)
    .whereNot("users_id", users)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json({ Error: "bad request" }));
};

const createAccount = (req, res) => {
  const { username, password, warehouse, role, created_on } = req.body;
  const hash = bcrypt.hashSync(password);
  db.transaction((trx) => {
    trx
      .insert({
        username: username,
        hash: hash,
      })
      .into("login")
      .returning("*")
      .then((data) => {
        return trx("users")
          .insert({
            username,
            role,
            warehouse,
            created_on,
          })
          .returning("*")
          .then((data) => {
            jwt.sign(
              data,
              process.env.SECRETKEY,
              { expiresIn: "30days" },
              (err, token) => {
                var account = {
                  token: token,
                  data: data,
                };
                res.json({ account });
              }
            );
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json({ Error: "bad request" }));
};

const updateAccount = (req, res) => {
  const { users, current_username, username, password, role } = req.body;
  db("users")
    .select("*")
    .from("users")
    .where(`users_id`, users)
    .then((data) => {
      if (data.length > 0) {
        return db("users")
          .update({ username, role })
          .where("username", "=", current_username)
          .returning("*")
          .then((data) => {
            console.log(data);
            res.json(data);
            const hash = bcrypt.hashSync(password);
            return db("login")
              .where("username", "=", current_username)
              .update({ username, hash });
          })
          .catch((e) => {
            throw e;
          });
      }
    })
    .catch((err) => res.status(400).json({ Error: "bad request" }));
};

const signIn = (req, res) => {
  db.select("username", "hash")
    .from("login")
    .where("username", "=", req.body.username)
    .then((data) => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      console.log("third", isValid);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("username", "=", req.body.username)
          .where("blocked", false)
          .then((profile) => {
            jwt.sign(
              { profile },
              process.env.SECRETKEY,
              { expiresIn: "30days" },
              (err, token) => {
                var account = {
                  token: token,
                  profile: profile,
                };
                res.json({ account });
              }
            );
          })
          .catch((err) =>
            res.status(401).json("Username and Password Incorrect")
          );
      } else {
        res.status(401).json("Password or Username Incorrect");
      }
    })
    .catch((err) => res.status(400).json({ Error: "bad request" }));
};

const blockAccount = (req, res) => {
    console.log(req.body)
  const { users } = req.body;
  db.select("users_id")
    .from("users")
    .where("users_id", "=", users)
    .then((data) => {
      if (data) {
        db("users")
          .update({ blocked: true })
          .where("users_id", users)
          .then((data) => {
            res.status(200).json({ Operation: "account blocked" });
          })
          .catch((err) => res.status(400).json({ Error: "bad request" }));
      } else {
        res.json("operation failed");
      }
    })
    .catch((err) => res.status(400).json({ Error: "bad request" }));
};

const UnBlockAccount = (req, res) => {
    console.log(req.body)
  const { users } = req.body;
  db.select("users_id")
    .from("users")
    .where("users_id", "=", users)
    .then((data) => {
      if (data) {
        db("users")
          .update({ blocked: false })
          .where("users_id", users)
          .then((data) => {
            res.status(200).json({ Operation: "account blocked" });
          })
          .catch((err) => res.status(400).json({ Error: "bad request" }));
      } else {
        res.json("operation failed");
      }
    })
    .catch((err) => res.status(400).json({ Error: "bad request" }));
};

module.exports = {
  getAllAccounts,
  createAccount,
  signIn,
  blockAccount,
  UnBlockAccount,
  getAllAccountsById,
  updateAccount,
};
