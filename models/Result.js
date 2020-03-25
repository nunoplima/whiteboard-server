const connection = require("../db/config");

const Result = {};

Result.findAll = (cb) => {
    const sql = 
        `
            SELECT
                user.username,
                a.user_id, 
                a.wod_id, 
                a.result, 
                a.created_at, 
                a.updated_at, 
                COUNT(b.result) + 1 as rank
            FROM result a 
            JOIN wod
                ON wod.id = a.wod_id
            JOIN user
                ON user.id = a.user_id    
            LEFT JOIN result b 
                ON IF(wod.score_type = 'time' OR wod.score_type = 'other', a.result > b.result and a.wod_id = b.wod_id, a.result < b.result and a.wod_id = b.wod_id)   
            GROUP BY a.user_id, a.wod_id, a.result, a.created_at, a.updated_at
            ORDER BY rank, a.updated_at
        `;
    connection.query(sql, (err, results, fields) => {
        cb(err, results);
    });
};

// Result.find = (wodId, userId, cb) => {
//     const sql = `SELECT user_id, username, wod_id, result, result.created_at, updated_at FROM result 
//         JOIN user
//             ON user.id = result.user_id
//         WHERE wod_id = ? AND user_id = ?`;
//     connection.query(sql, [wodId, userId], (err, results, fields) => {
//         cb(err, results);
//     });
// };

// Result.create = (resultData, cb) => {
//     const sql = `INSERT INTO result SET ?`
//     connection.query(sql, [resultData], (err, results, fields) => {
//         cb(err, results);
//     });
// };

// Result.update = (result, wodId, userId, cb) => {
//     const sql = `UPDATE result SET result = ? WHERE wod_id = ? AND user_id = ?`;
//     connection.query(sql, [result, wodId, userId], (err, results, fields) => {
//         cb(err, results);
//     });
// }

module.exports = Result;