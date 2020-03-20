const authRouter = require("express").Router();
const { checkFacebookToken, findUserByFacebookId, createUser, findUserById, sendUserAndToken } = require("../controllers/auth-controller");
const { isAuthorized } = require("../services/jwt");

authRouter.get("/", isAuthorized, findUserById, sendUserAndToken)

authRouter.post("/", checkFacebookToken, findUserByFacebookId, createUser, findUserById, sendUserAndToken);

module.exports = authRouter;

