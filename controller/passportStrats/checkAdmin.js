const checkAdmin = (req, res, next) => {
    if (req.user.admin) {
        res.next();
    } else {
        res.status(403).send('You are not authorized for this action');
    }
};

//not sure if it should be 'res.next()', or just 'next()'
//will not work until i figure out how req.user (user auth from passport) works

module.exports = checkAdmin;