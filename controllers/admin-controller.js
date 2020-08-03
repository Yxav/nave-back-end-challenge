const db = require('../database/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const variables = require("../bin/configuration/variables")


exports.store = async(req, res) => {
    let { email, password, confirm_password } = req.body;

    const userExists = await db('admins')
        .where('email', email)
        .first()

    if (userExists) {
        console.log(userExists)
        return res.json({ message: "This email was registered" }).status(204);
    }

    password = await bcrypt.hash(password, 10)

    try {
        await db('admins').insert({
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

    const user = await db('admins')
        .where('email', email)
        .first()

    if (!user) {
        res.status(400).send({ message: "User doesn't exists" })
        return
    }
    if (!await bcrypt.compare(password, user.password)) {
        res.status(400).send({ message: "Passwords doesn't match" })
        return

    }
    res.status(200).send({ token: jwt.sign({ user: user }, variables.Security.secretKey) })
    console.log("falae")
}

exports.authenticate = async(req, res) => {

}