const wodRouter = require("express").Router();
const { findAllWods, findAllResults, mapResultsToWods, sendWodsAndResults } = require("../controllers/wod-controller");
const { isAuthorized } = require("../services/jwt");

wodRouter.get("/", isAuthorized, findAllWods, findAllResults, mapResultsToWods, sendWodsAndResults);

module.exports = wodRouter;