const authRouter = require("express").Router();
const { checkFacebookToken, findUserByFacebookId, setGender, createUser, findUserById, sendUserAndToken } = require("../controllers/auth-controller");
const { isAuthorized } = require("../services/jwt");

authRouter.get("/", isAuthorized, findUserById, sendUserAndToken)

authRouter.post("/", checkFacebookToken, findUserByFacebookId, setGender, createUser, findUserById, sendUserAndToken);

module.exports = authRouter;

