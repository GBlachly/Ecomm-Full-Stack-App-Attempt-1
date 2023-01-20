require('dotenv').config();

const Pool = require('pg').Pool;
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
});

module.exports = {
    query: (text, params, callback) => {
      return pool.query(text, params, callback)
    },

    /*I dont think this is necessary. Pretty sure you can use the first pool.query function 
    and just not included the callback as the third parameter */
    queryNoCB: (text, params) => {
      return pool.query(text, params)
    },
  };
  