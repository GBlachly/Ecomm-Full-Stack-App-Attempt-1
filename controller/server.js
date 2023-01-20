// REQUIRES
const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan'); 

const session = require('express-session');
const store = new session.MemoryStore();
/* Note: Storing in-memory sessions is something that should be done only 
during development, NOT during production due to security risks. */

const passport = require("passport");
const localStrat = require('./passportStrats/localStrat');

require('dotenv').config();
const PORT = process.env.SERVER_PORT || 4001;

const db = require('./db/db');

const usersRouter = require('./routers/usersRouter.js');
const productsRouter = require('./routers/productsRouter.js');
const ordersRouter = require('./routers/ordersRouter.js');
const cartsRouter = require('./routers/cartsRouter.js');


// USES/SESSION
app.use(cors()); //Not sure where this goes exactly or if i actually need it 
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(
  session({
    secret: "RandomString1234", //this random string should be stored securely in an environment variable
    cookie: { maxAge: 1000 * 60 *60 * 24, secure: true, sameSite: "none" },
    resave: false,
    saveUninitialized: false,
    store
  })
);


// PASSPORT
app.use(passport.initialize()); // notes 4.7 pg. 78
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.query('SELECT * FROM users WHERE id = $1;', [id], (err, result) => {
    if (err) {
      return next(err);
    }
    const user = result.rows[0];
    done(null, user);
  })
});

passport.use("local", localStrat);


// ROUTES
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/carts', cartsRouter);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Error Occured';
  res.status(status).send(message);
});


// RUN SERVER
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  }
);
  