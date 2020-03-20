const connection = require("./config");

const seedUsers = new Promise((resolve, reject) => {
    connection.query(
        `
            INSERT INTO user (id, facebook_id, username) VALUES
                (1, 139933480858453, "Nuno Lima"),
                (2, 121323135231313, "André Peres"),
                (3, 123123123312313, "João Cruz")
        `,
        (err, results) => {
            if (err) reject(err);
            else resolve("User table seeded");
        }
    );
});

const seedWods = new Promise((resolve, reject) => {
    connection.query(
        `
            INSERT INTO wod (description, scheduled_date, score_type) VALUES
                ("4 RFT\nBurpees x 10\nAir squats x 30\nAB plank 2 min", "2020-03-18", "time"),
                ("8 RFT\nTowel roll outs x 10\nTowel/TRX rows x 12\nOne leg RDLs x 7 + 7 (jugs)", "2020-03-19", "time"),
                ("EMOM 15\nA) Banded DL/Good morings x 15\nB) High knee jumps x 10\nC) Push ups x 20", "2020-03-20", "load")
        `,
        (err, results) => {
            if (err) reject(err);
            else resolve("Wod table seeded");
        }
    );
});

const seedResults = new Promise((resolve, reject) => {
    connection.query(
        `
            INSERT INTO result (user_id, wod_id, result) VALUES
                (1, 3, 8.12),
                (2, 1, 15.30),
                (3, 1, 15.20),
                (2, 2, 8),
                (3, 2, 8.30)
        `,
        (err, results) => {
            if (err) reject(err);
            else resolve("Result table seeded");
        }
    );
});

const seedTables = async () => {
    const seedUsersLog = await seedUsers;
    console.log(seedUsersLog);
    const seedWodsLog = await seedWods;
    console.log(seedWodsLog);
    const seedResultsLog = await seedResults;
    console.log(seedResultsLog);
    connection.end();
};

seedTables();
