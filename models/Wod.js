const connection = require("../db/config");

const Wod = {};

Wod.findAll = (cb) => {
    const sql = `SELECT * FROM wod 
        WHERE DATE(scheduled_date) <= CURDATE()
        ORDER BY scheduled_date DESC`;
    connection.query(sql, (err, results, fields) => {
        cb(err, results);
    });
};

module.exports = Wod;