const db = require('../db/db');
const bcrypt = require('bcrypt');


const registerUser = async (req, res, next) => {
    const {username, password, email } = req.body;
    const admin = req.body.admin || false;
    
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
   
    db.query(`INSERT INTO users (username, password, email, admin)
            VALUES ($1, $2, $3, $4) RETURNING username, email;`, 
            [username, passwordHash, email, admin], 
            (err, result) => {
                if (err) {
                    return next(err)
                }
                res.status(201).send(`Created User: ${result.rows[0].username} w/ email: ${result.rows[0].email}`);
            }
    );
};


const updateUsername = (req, res, next) => {
    const { userId } = req.body;
    //const userId = req.user.id;
    
    const { username } = req.body;

    db.query(`UPDATE users SET username = $2 WHERE id = $1 RETURNING username;`, 
            [userId, username], 
            (err, result) => {
                if (err) {
                    return next(err);
                }
                res.status(200).send(`Username set to ${result.rows[0]}`)
            }
    );
};


const updatePassword = async (req, res, next) => {
    const { userId } = req.body;
    //const userId = req.user.id;
    
    const { password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    db.query(`UPDATE users SET password = $2 WHERE id = $1;`,
            [userId, passwordHash], 
            (err, result) => {
                if (err) {
                    return next(err);
                }
                res.status(200).send(`Password Updated`);
            }
    );
};


const deleteUser = (req, res, next) => {
    const { userId } = req.body;
    //const userId = req.user.id;

    db.query(`DELETE FROM users WHERE id = $1;`,
            [userId],
            (err, result) => {
                if (err) {
                    return next(err);
                }
                res.status(200).send(`User Deleted`);
            }
    );
};


module.exports = {
    registerUser,
    updateUsername,
    updatePassword,
    deleteUser
};