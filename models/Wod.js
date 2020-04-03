const connection = require("../db/config");

const Wod = {};

Wod.findAll = (cb) => {
    const sql = `SELECT 
        wod.id, wod.box_id, box.name AS box_name, box.logo_url, box.box_url, description, scheduled_date, video_url, score_type, wod.created_at  
        FROM wod 
        LEFT JOIN box
            ON wod.box_id = box.id
        WHERE DATE(scheduled_date) <= CURDATE()
        ORDER BY scheduled_date DESC`;
    connection.query(sql, (err, results, fields) => {
        cb(err, results);
    });
};

module.exports = Wod;