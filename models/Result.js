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

Result.find = (wodId, userId, cb) => {
    const sql = `SELECT user_id, username, wod_id, result, result.created_at, updated_at FROM result 
        JOIN user
            ON user.id = result.user_id
        WHERE wod_id = ? AND user_id = ?`;
    connection.query(sql, [wodId, userId], (err, results, fields) => {
        cb(err, results);
    });
};

Result.create = (resultData, cb) => {
    const sql = `INSERT INTO result SET ?`
    connection.query(sql, [resultData], (err, results, fields) => {
        cb(err, results);
    });
};

Result.update = (result, wodId, userId, cb) => {
    const sql = `UPDATE result SET result = ? WHERE wod_id = ? AND user_id = ?`;
    connection.query(sql, [result, wodId, userId], (err, results, fields) => {
        cb(err, results);
    });
}


module.exports = Result;