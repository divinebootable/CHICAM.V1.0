/**
 * File: src/api_v1/controllers/profile.controller.js
 * Description: profile controller for chicam inventory system
 * Date: 14/08/2021
 * Author: Monyuy Divine Kongadzem
 */

const db = require("../../../config/db");

const createProfile = (req, res) => {
  const { profile_name, created_on } = req.body;
  console.log(req.body);
  db("profile")
    .insert({ profile_name, created_on })
    .returning("*")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json({ Error: "bad request" }));
};

const getProfile = (req, res) => {
  db.select("*")
    .from("profile")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json({ Error: "bad request" }));
};

const updateProfile = (req, res) => {
  const { profile_id, profile_name } = req.body;
  db("profile")
    .select({ profile_id })
    .where(`profile_id`, profile_id)
    .then((data) => {
      //check if data exist
      if (data.length > 0) {
        db("profile")
          .update({ profile_name })
          .where(`profile_id`, profile_id)
          .returning("*")
          .then((data) => {
            res.json(data);
          });
      }
    })
    .catch((err) => res.status(400).json({ dbError: "bad request" }));
};

const deleteProfile = (req, res) => {
  const { profile_id } = req.body;
  console.log(req.body);
  db("profile")
    .where({ profile_id })
    .del()
    .then(() => {
      res.json({ delete: "successful" });
    })
    .catch((err) => res.status(400).json({ dbError: "bad request" }));
};

module.exports = {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
};
