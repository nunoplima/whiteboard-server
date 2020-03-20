const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt")
require("dotenv").config();

const genToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET);
    return token;
};

const isAuthorized = expressJwt({ 
    secret: process.env.JWT_SECRET, 
    requestProperty: "userData",
    getToken: (req) => {
        if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
            return req.headers.authorization.split(" ")[1];
        } else if (req.query && req.query.token) {
          return req.query.token;
        }
        return null;
    }
});

module.exports = { genToken, isAuthorized };

