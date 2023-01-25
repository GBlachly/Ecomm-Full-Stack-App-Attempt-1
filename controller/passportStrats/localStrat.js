const LocalStrategy = require("passport-local").Strategy;
const db = require('../db/db');
const bcrypt = require('bcrypt');


const localStrat = new LocalStrategy(
    function (username, password, done) {
      console.log('staring passport strat');
      db.query('SELECT * FROM users WHERE username = $1;', [username], async (err, result) => {
        
        const user = result.rows[0];
        
        if (err) return done(err);
        if (!user) return done(null, false);
        const matchedPassword = await bcrypt.compare(password, user.password);
        if (!matchedPassword) return done(null, false);
        return done(null, user);
      });
    }
);

module.exports = localStrat; 