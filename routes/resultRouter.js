const resultRouter = require("express").Router({ mergeParams: true });
const { getUsersLeaderboard } = require("../controllers/result-controller");
// const { createResult, findResultByWodAndUser, updateResult, sendResult } = require("../controllers/result-controller");
// const { isAuthorized } = require("../services/jwt");

resultRouter.get("/", getUsersLeaderboard);

// resultRouter.post("/", isAuthorized, createResult, findResultByWodAndUser, sendResult);

// resultRouter.put("/", isAuthorized, updateResult, findResultByWodAndUser, sendResult);


module.exports = resultRouter;