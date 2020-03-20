const fetch = require("node-fetch");
const Wod = require("../models/Wod");
const Result = require("../models/Result");
require("dotenv").config();

const findAllWods = (req, res, next) => {
    Wod.findAll((err, results) => {
        if (err) return next(err);
        req.wods = results;
        next();
    });
};

const findAllResults = (req, res, next) => {
    Result.findAll((err, results) => {
        if (err) return next(err);
        req.results = results;
        next();
    });
};

const mapResultsToWods = (req, res, next) => {
    const { wods, results } = req;
    const resultsMappedToWods = wods.map(wod => {
       const wodResults = results.filter(result => result.wod_id === wod.id);
       return {
           ...wod,
           results: wodResults,
       }
    });
    req.wods = resultsMappedToWods;
    next();
};

const sendWodsAndResults = (req, res) => {
    const { wods } = req;
    res.status(200).json({ wods });
};


module.exports = { findAllWods, findAllResults, mapResultsToWods, sendWodsAndResults };