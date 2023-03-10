// REQUIRES
const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan'); 


const session = require('express-session');
//const store = new session.MemoryStore();
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
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "OPTIONS"],
  credentials: true
};
app.use(cors(corsOptions)); 
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(
  session({
    secret: "RandomString1234", //this random string should be stored securely in an environment variable
    name: "cookie/session name",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 *60 * 24, secure: false, sameSite: "none" }
    //, store
  })
);



// PASSPORT
app.use(passport.initialize()); // notes 4.7 pg. 78
app.use(passport.session());

passport.serializeUser((user, done) => {
  console.log(`serialize: user:${user.id}`);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log(`deserializing:...`);

  db.query('SELECT * FROM users WHERE id = $1;', [id], (err, result) => {
    if (err) {
      return next(err);
    }
    const user = result.rows[0];
    console.log(`deserialize: user:${user}`);
    done(null, user);
  })
}); 

/* passport.deserializeUser((id, done) => {
  done(null, { id });
}); */

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
  