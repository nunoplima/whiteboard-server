const connection = require("../db/config");

const User = {};

User.findById = (id, cb) => {
    const sql = `SELECT * FROM user WHERE id = ?`;
    connection.query(sql, id, (err, results, fields) => {
        cb(err, results);
    });
};

User.findByFacebookId = (fbId, cb) => {
    const sql = `SELECT * FROM user WHERE facebook_id = ?`;
    connection.query(sql, fbId, (err, results, fields) => {
        cb(err, results);
    });
};

User.create = (userData, cb) => {
    const sql = `INSERT INTO user SET ?`;
    connection.query(sql, [userData], (err, results, fields) => {
        cb(err, results);
    })
}

module.exports = User;