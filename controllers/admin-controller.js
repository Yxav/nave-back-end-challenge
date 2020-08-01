const db = require('../database/db')


exports.store = async(req, res) => {
    const { email, password } = req.body;

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
    // implantar jwt depois
}