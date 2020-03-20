const connection = require("../db/config");

const Result = {};

Result.findAll = (cb) => {
    const sql = `SELECT user_id, username, wod_id, result, result.created_at, updated_at FROM result
        JOIN user
            ON user.id = result.user_id
        ORDER BY result.created_at DESC`;
    connection.query(sql, (err, results, fields) => {
        cb(err, results);
    });
};

module.exports = Result;