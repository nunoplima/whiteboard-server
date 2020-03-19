const authRouter = require("express").Router();
const { checkFacebookToken, findUserByFacebookId, sendToken } = require("../controllers/auth-controller");

authRouter.post("/", checkFacebookToken, findUserByFacebookId, sendToken);

module.exports = authRouter;

