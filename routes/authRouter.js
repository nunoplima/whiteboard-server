const authRouter = require("express").Router();
const { checkFacebookToken, findUserByFacebookId, createUser, findUserById, sendUserAndToken } = require("../controllers/auth-controller");

authRouter.post("/", checkFacebookToken, findUserByFacebookId, createUser, findUserById, sendUserAndToken);

module.exports = authRouter;

