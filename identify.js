const Rest = require("./rest.js");
const fs = require("fs");
const path = require("path");

let identify_hostname = "identitytoolkit.googleapis.com";
let identify_secret_key = null;

const dotenv = require('dotenv')
require('dotenv').config()

identify_secret_key = process.env.ID_KEY;
if (process.env.identify_hostname) identify_hostname = process.env.identify_hostname;

let identify_rest = new Rest(identify_hostname);

let identify_cache;
let identify_timeout = 0;
function identify(idKey) {
    if (!idKey) {
        if (identify_secret_key) {
            idKey = identify_secret_key;
        } else {
            throw new Error("No identify key provided and no secret.json found!");
        }
    }

    if (new Date().getTime() >= identify_timeout) {
        return new Promise(async (resolve, reject) => {
            let res = await identify_rest.post("/v1/accounts:signUp?key=" + idKey, {
                key: idKey
            });
            identify_cache = res.idToken;
            identify_timeout = new Date().getTime() + 1000 * +res.expiresIn - 30000;
            resolve(identify_cache);
        });
    } else {
        return new Promise((resolve) => {
            resolve(identify_cache);
        });
    }
}

module.exports = identify;