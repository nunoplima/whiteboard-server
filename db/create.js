const connection = require("./config");

const createUsers = new Promise((resolve, reject) => {
    connection.query(
        `CREATE TABLE user (
        id INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
        facebook_id DECIMAL(21, 0) UNIQUE,
        is_coach TINYINT(1) DEFAULT 0,
        is_owner TINYINT(1) DEFAULT 0,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`,
        err => {
            if (err) {
                reject(err);
            } else {
                resolve("User table created");
            }
        }
    );
});

const createWods = new Promise((resolve, reject) => {
    connection.query(
        `CREATE TABLE wod (
        id BIGINT(20) PRIMARY KEY AUTO_INCREMENT NOT NULL,
        description VARCHAR(2083) NOT NULL,
        scheduled_date DATETIME NOT NULL,
        video_url VARCHAR(2083) DEFAULT NULL,
        score_type ENUM("rounds", "reps", "load", "time", "other"),
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`,
        err => {
            if (err) {
                reject(err);
            } else {
                resolve("Wod table created");
            }
        }
    );
});

const createResults = new Promise((resolve, reject) => {
    connection.query(
        `CREATE TABLE result (
        PRIMARY KEY(user_id,wod_id),
        user_id INT(11) NOT NULL,
        wod_id BIGINT(20) NOT NULL,
        result INT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE now(),
        FOREIGN KEY (user_id) 
            REFERENCES user(id),
        FOREIGN KEY (wod_id) 
            REFERENCES wod(id)
        )`,
        err => {
            if (err) {
                reject(err);
            } else {
                resolve("Result table created");
            }
        }
    );
});

const createTables = async () => {
    const createUsersLog = await createUsers;
    console.log(createUsersLog);
    const createWodsLog = await createWods;
    console.log(createWodsLog);
    const createResultsLog = await createResults;
    console.log(createResultsLog);
    connection.end();
};

createTables();
