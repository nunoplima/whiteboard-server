const io = require("socket.io")();
const Result = require("../models/Result");
const { reArrange } = require("../util/reArrangeResults");


const createResult = (resultData) => ( 
    new Promise((resolve, reject) => {
        Result.create(resultData, (err, results) => {
            if (err) reject(err);
            else resolve();
        });
    })
);

const findResults = (wodId, userId) => (
    new Promise((resolve, reject) => {
        Result.find(wodId, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
);

const updateResult = (result, wodId, userId) => (
    new Promise((resolve, reject) => {
        Result.update(result, wodId, userId, (err, results) => {
            if (err) reject(err);
            else resolve();
        });
    })
);

const findLeaderboard = results => (
    new Promise((resolve, reject) => {
        Result.findAll((err, leaderboard) => {
            if (err) reject(err);
            else resolve({ results, leaderboard: reArrange(leaderboard) });
        });
    })
);

io.on("connection", socket => {
    console.log("a user signed in");

    // Add a new result
    socket.on("add result", (resultData) => {
        console.log("adding result");
        const { wod_id: wodId, user_id: userId } = resultData;
        createResult(resultData)
            .then(() => findResults(wodId))
            .then((results) => findLeaderboard(results))
            .then(({ results, leaderboard }) => io.emit("add to results", { wodId, results, leaderboard }))
            .catch((e) => console.log(e));
    });

    // Edit an existing result
    socket.on("edit result", ({ result, wod_id: wodId, user_id: userId }) => {
        console.log("editing result");
        updateResult(result, wodId, userId)
            .then(() => findResults(wodId))
            .then((results) => findLeaderboard(results))
            .then(({ results, leaderboard }) => io.emit("edit results", { wodId, results, leaderboard }))
            .catch((e) => console.log(e));
    });

});

module.exports = io;
