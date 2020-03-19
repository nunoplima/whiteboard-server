const connection = require("./config");

const seedWods = new Promise((resolve, reject) => {
    connection.query(
        `
            INSERT INTO wod (description, scheduled_date, score_type) VALUES
                ("4 RFT\nBurpees x 10\nAir squats x 30\nAB plank 2 min", "2020-03-18", "time"),
                ("8 RFT\nTowel roll outs x 10\nTowel/TRX rows x 12\nOne leg RDLs x 7 + 7 (jugs)", "2020-03-19", "time"),
                ("EMOM 15\nA) Banded DL/Good morings x 15\nB) High knee jumps x 10\nPush ups x 20", "2020-03-20", "other")
        `,
        (err, results) => {
            if (err) reject(err);
            else resolve("Wod table seeded");
        }
    );
});

const seedTables = async () => {
    const seedWodsLog = await seedWods;
    console.log(seedWodsLog);
    connection.end();
};

seedTables();
