const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ecomm-api',
  password: 'postgres',
  port: 5432,
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
  