const Result = require("../models/Result");
require("dotenv").config();

const createResult = (req, res, next) => {
    const { wodId: wod_id } = req.params;
    const { id: user_id } = req.userData;
    const { result } = req.body;
    Result.create({ wod_id, user_id, result }, (err, results) => {
        if (err) return next(err);
        next();
    });
};

const findResultByWodAndUser = (req, res, next) => {
    const { wodId } = req.params;
    const { id: userId } = req.userData;
    Result.find(wodId, userId, (err, results) => {
        if (err) return next(err);
        req.result = results[0];
        next();
    });
};

const updateResult = (req, res, next) => {
    const { wodId } = req.params;
    const { id: userId } = req.userData;
    const { result } = req.body;
    Result.update(result, wodId, userId, (err, results) => {
        if (err) return next(err);
        next();
    });
};

const sendResult = (req, res, next) => {
    const status = req.method === "POST" ? 201 : 200;
    res.status(status).json({ result: req.result });
};


module.exports = { createResult, findResultByWodAndUser, updateResult, sendResult };