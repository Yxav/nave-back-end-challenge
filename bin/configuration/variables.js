require("dotenv").config();
const variables = {
    Security: {
        secretKey: process.env.secretKey
    }
}

module.exports = variables;