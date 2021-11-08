'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');


function createToken (user) {
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(3, 'hours').unix()
    }

    return jwt.encode(payload, process.env.SECRET_TOKEN);
}

function decodeToken (token) {
    const decoded = new Promise((resolve, reject) => {
        try{
            const payload = jwt.decode(token, process.env.SECRET_TOKEN);

            if (payload.exp <= moment().unix()) {
                resolve ({
                    status: 401,
                    message: "El token ha expirado",
                    logged_in: "NOT_LOGGED_IN"
                });
            }

            resolve(payload.sub);
        } catch (err) {
            reject({
                status: 500,
                message: "Invalid token",
                logged_in: "NOT_LOGGED_IN"
            })
        }
    })

    return decoded;
}

module.exports = {
    createToken, 
    decodeToken
};