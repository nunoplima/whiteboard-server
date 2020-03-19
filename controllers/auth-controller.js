const fetch = require("node-fetch");
const { genToken } = require("../services/jwt");
const User = require("../models/User");
require("dotenv").config();

const { FB_APP_ID, FB_APP_SECRET } = process.env;

const checkFacebookToken = async (req, res, next) => {
    try {
        const { accesstoken } = req.query;
        const rawResponse = await fetch(`https://graph.facebook.com/v5.0/debug_token?input_token=${accesstoken}&access_token=${FB_APP_ID}|${FB_APP_SECRET}`);
        const response = await rawResponse.json();
        const { app_id: appId, is_valid: isValid } = response.data;
        // if the token was issued for our fb app and is valid
        if (appId === FB_APP_ID && isValid) {
            next();
        } else {
            console.log("Facebook token is invalid");
            res.status(200).json({ error: "Facebook token is invalid"});
        }
    } catch(e) {
        // TODO handle error
        console.log(e);
    }
};

const findUserById = (req, res, next) => {
    const id = req.insertId;
    if (!id) return next();
    User.findById(id, (err, results) => {
        if (err) return next(err);
        req.user = results[0];
        next();
    });
};

const findUserByFacebookId = (req, res, next) => {
    User.findByFacebookId(req.body.facebook_id, (err, results) => {
        if (err) return next(err);
        req.user = results[0];
        next();
    });
};

const createUser =  (req, res, next) => {
    if (req.user) return next();
    User.create(req.body, (err, results) => {
        if (err) return next(err);
        req.insertId = results.insertId;
        next();
    });
};

const sendUserAndToken = (req, res, next) => {
    const user = req.user;
    const token = genToken(req.body.id);
    res.status(200).json({ user, token });
};

module.exports = { checkFacebookToken, findUserById, findUserByFacebookId, createUser, sendUserAndToken };