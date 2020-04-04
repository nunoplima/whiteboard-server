const connection = require("../db/config");

const Result = {};

Result.findAll = (cb) => {
    const sql = 
        `
            SELECT
                user.username,
                user.gender,
                a.user_id, 
                a.wod_id, 
                a.result, 
                a.created_at, 
                a.updated_at, 
                IF (a.result > 0, COUNT(b.result) + 1, "-") AS rank
            FROM result AS a 
            JOIN wod
                ON wod.id = a.wod_id
            JOIN user
                ON user.id = a.user_id    
            LEFT JOIN result AS b 
                ON IF(wod.score_type = 'time', a.result > b.result and a.wod_id = b.wod_id, a.result < b.result and a.wod_id = b.wod_id)   
            GROUP BY a.user_id, a.wod_id, a.result, a.created_at, a.updated_at
            ORDER BY rank, a.updated_at
        `;
    connection.query(sql, (err, results, fields) => {
        cb(err, results);
    });
};

Result.find = (wodId, cb) => {
    const sql = 
        `
            SELECT
                user.username,
                user.gender,
                a.user_id, 
                a.wod_id, 
                a.result, 
                a.created_at, 
                a.updated_at, 
                IF (a.result > 0, COUNT(b.result) + 1, "-") AS rank
            FROM result AS a 
            JOIN wod
                ON wod.id = a.wod_id
            JOIN user
                ON user.id = a.user_id    
            LEFT JOIN result AS b 
                ON IF(wod.score_type = 'time', a.result > b.result and a.wod_id = b.wod_id, a.result < b.result and a.wod_id = b.wod_id)   
            WHERE a.wod_id = ?
            GROUP BY a.user_id, a.wod_id, a.result, a.created_at, a.updated_at
            ORDER BY rank, a.updated_at
        `;
    connection.query(sql, wodId, (err, results, fields) => {
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
};

module.exports = Result;