const knex = require("knex");

const db = knex({
  // connect to your own database here:
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  },
});

module.exports = db;
