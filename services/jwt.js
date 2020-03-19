const jwt = require("jsonwebtoken");
require("dotenv").config();

const genToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET);
    return token;
};

module.exports = { genToken };

