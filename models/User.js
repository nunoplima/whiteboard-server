const connection = require("../db/config");

const User = {};

User.findByFacebookId = (fbId, cb) => {
    const sql = `SELECT * FROM user WHERE facebook_id = ?`;
    connection.query(sql, fbId, (err, results, fields) => {
        cb(err, results);
    });
};

module.exports = User;