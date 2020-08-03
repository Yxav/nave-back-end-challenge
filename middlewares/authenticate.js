const jwt = require('jsonwebtoken');
const variables = require("../bin/configuration/variables")

exports.authorize = function(req, res, next) {

    const authHeader = req.headers.authorization

    const [, token] = authHeader.split(' ');

    if (!token) {
        res.status(401).send({ message: "Token is required" })
    }

    try {
        var decoded = jwt.verify(token, variables.Security.secretKey);
        console.log(decoded)
        next()
    } catch (err) {
        console.log(err)
    }



}