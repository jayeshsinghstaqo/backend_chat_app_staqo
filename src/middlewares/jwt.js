const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../config');
const { serviceResponse } = require('../utils/services/service_response');
const { _auth_module } = require('../utils/helpers/messages');
const { Accounts } = require('../models/app/User');
const { _account_status } = require('../utils/constants/model');

exports.verifyJwtToken = function (req, res, next) {
    let authorization = req.headers.authorization;
    if (authorization) {
        var tokenBearer = authorization.split(' ');
        var token = tokenBearer[1];

        jwt.verify(token, JWT_SECRET_KEY, async function (err, decoded) {
            if (err) {
                return res.status(403).json(new serviceResponse({ status: 403, error: _auth_module.unAuth }));
            }
            else {
                req.email = decoded.email;
                req.account_id = decoded.account_id;
                req.company_name = decoded.company_name
                next();
            }
        });
    }
    else {
        return res.status(403).send(new serviceResponse({ status: 403, error: _auth_module.tokenMissing }));
    }
};

exports.verifyAccount = async function (req, res, next) {
    try {
        let { account_id } = req;
        let account = await Accounts.findOne({ _id: account_id, deleted_at: null, status: _account_status.Active })
        if (!account) {
            return res.status(403).json(new serviceResponse({ status: 403, error: _auth_module.unAuth }));
        }
        console.log(account_id)
        next()
    } catch (error) {
        return res.status(500).json(new serviceResponse({ status: 500, error: error.message }));
    }
}


exports.verifyBasicAuth = async function (req, res, next) {
    try {
        const authheader = req.headers.authorization;

        if (!authheader) {
            res.setHeader('WWW-Authenticate', 'Basic');
            return res.status(401).json(new serviceResponse({ status: 401, error: _auth_module.unAuth }));
        }

        const auth = new Buffer.from(authheader.split(' ')[1], 'base64').toString().split(':');
        const user = auth[0];
        const pass = auth[1];

        if (user && pass) {
            let account = await Accounts.findOne({ user_name: user, secret_key: pass, deleted_at: null, status: _account_status.Active })
            if (!account) {
                return res.status(403).json(new serviceResponse({ status: 403, error: _auth_module.unAuth }));
            }
            req.email = account.email;
            req.account_id = account._id;
            req.company_name = account.company_name
            next();
        } else {
            res.setHeader('WWW-Authenticate', 'Basic');
            return res.status(401).json(new serviceResponse({ status: 401, error: _auth_module.unAuth }));
        }
    } catch (error) {
        return res.status(500).json(new serviceResponse({ status: 500, error: error.message }));
    }
}