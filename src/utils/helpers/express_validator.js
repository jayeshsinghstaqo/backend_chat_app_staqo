const { serviceResponse } = require("../services/service_response");
const { validationResult } = require('express-validator');

const errorFormatter = ({ location, msg, param }) => {
    // return {
    //     "message": msg,
    //     "param": param,
    //     "location": location
    // }
    return msg;
};

exports.validateErrors = (req, res, next) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        return res.status(200).send(new serviceResponse({ status: 400, error: errors.array({ onlyFirstError: true })?.join("") }))
    }
    
    /* deleting unaccessable fields */
    delete req.body.created_at;
    delete req.body.updated_at;
    delete req.body.deleted_at;
    delete req.body.created_by;
    delete req.body.updated_by;
    delete req.body.deleted_by;
    next();
}