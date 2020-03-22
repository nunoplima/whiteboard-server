const io = require("socket.io")();
const Result = require("../models/Result");


const createResult = (resultData) => ( 
    new Promise((resolve, reject) => {
        Result.create(resultData, (err, results) => {
            if (err) reject(err);
            else resolve();
        });
    })
);

const findResult = (wodId, userId) => (
    new Promise((resolve, reject) => {
        Result.find(wodId, userId, (err, results) => {
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

io.on("connection", socket => {
    console.log("a user signed in");

    // Add a new result
    socket.on("add result", (resultData) => {
        console.log("adding result");
        const { wod_id: wodId, user_id: userId } = resultData;
        createResult(resultData)
            .then(() => findResult(wodId, userId))
            .then((results) => socket.emit("add to results", { wodId, result: results[0] }))
            .catch((e) => console.log(e));
    });

    // Edit an existing result
    socket.on("edit result", ({ result, wod_id: wodId, user_id: userId }) => {
        console.log("editing result");
        updateResult(result, wodId, userId)
            .then(() => findResult(wodId, userId))
            .then((results) => socket.emit("edit results", { wodId, userId, result: results[0] }))
            .catch((e) => console.log(e));
    });

});

module.exports = io;
