const connection = require("./config");

connection.query(`DROP TABLE IF EXISTS result`, err => {
    if (err) {
        console.log(err);
        connection.end();
    } else {
        connection.query(`DROP TABLE IF EXISTS wod`, err => {
            if (err) {
                console.log(err);
                connection.end();
            } else {
                connection.query(`DROP TABLE IF EXISTS user`, err => {
                    if (err) {
                        console.log(err);
                        connection.end();
                    } else {
                        console.log("Tables dropped");
                        connection.end();
                    }
                });
            }
        });
    }
});
