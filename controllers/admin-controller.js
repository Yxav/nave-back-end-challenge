const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const variables = require("../bin/configuration/variables")
const validator = require("../bin/helpers/validator-service")
const Admin = require("../models/Admin")



exports.store = async(req, res) => {
    let { email, password, confirm_password } = req.body;

    let validate = new validator();

    validate.isEmail(email);

    if (!validate.isValid()) {
        res.status(400).send(validate.errors()).end();
        return;
    }

    const userExists = await Admin.query()
                            .where({email})
                            .first()

    if (userExists) {
        return res.json({ message: "This email is already registered" }).status(204);
    }

    password = await bcrypt.hash(password, 10)

    try {
        await Admin.query()
        .insert({
            email,
            password
        })

        return res.json({ message: "Successful register" }).status(200);
    } catch (e) {
        res.status(500).send({ message: "error", erro: e })
    }
}

exports.login = async(req, res) => {
    const { email, password } = req.body;

    const user = await Admin.query()
                            .where({ email })
                            .first()

    if (!user) {
        res.status(400).send({ message: "User doesn't exists" })
        return
    }
    if (!await bcrypt.compare(password, user.password)) {
        res.status(400).send({ message: "Invalid password" })
        return

    }
    res.status(200).send({ token: jwt.sign({ user }, variables.Security.secretKey) })
}