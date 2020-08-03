const db = require('../database/db')
const validator = require("../bin/helpers/validator-service")


exports.store = async(req, res) => {

    const { name, navers } = req.body;
    const id_admin = req.loggedUser.user.id;

    let validate = new validator();

    validate.isString(name);
    validate.isArray(navers);

    if (!validate.isValid()) {
        res.status(400).send(validate.errors()).end();
        return;
    }

    try {
        await db('projects').insert({
            name,
            navers,
            id_admin
        })

        res.send({ message: "Project registered" }).status(200);
    } catch (e) {
        res.send({ message: "Internal error", error: e }).status(500);
    }
}

exports.index = async(req, res) => {
    const id_admin = req.loggedUser.user.id;
    try {
        const projects = await db('projects')
            .select('id', 'name')
            .where('id_admin', id_admin)
        res.send(projects).status(200)
    } catch (e) {
        res.send({ message: "Internal error", error: e }).status(500);
    }
}

exports.show = async(req, res) => {
    const { id } = req.params
    const id_admin = req.loggedUser.user.id;
    try {
        const project = await db('projects')
            .select('id', 'name', 'navers')
            .where({
                'id': id,
                'id_admin': id_admin
            })
            .first()

        res.send(project).status(200)
    } catch (e) {
        res.send({ message: "Internal error", error: e }).status(500);

    }
}

exports.update = async(req, res) => {
    const { id } = req.params
    const { name, navers } = req.body;
    const id_admin = req.loggedUser.user.id;

    let validate = new validator();

    validate.isString(name);
    validate.isArray(navers);

    if (!validate.isValid()) {
        res.status(400).send(validate.errors()).end();

        return;
    }

    try {
        await db('projects')
            .where({
                'id': id,
                'id_admin': id_admin
            })
            .update({
                name,
                navers
            })
        res.send({ message: "Updated" }).status(200)

    } catch (e) {
        res.send({ message: "Internal error", error: e }).status(500);

    }

}

exports.delete = async(req, res) => {
    const { id } = req.params
    const id_admin = req.loggedUser.user.id;


    try {
        await db('projects')
            .where({
                'id': id,
                'id_admin': id_admin
            })
            .first()
            .delete()
        res.send({ message: "Deleted" }).status(200)

    } catch (e) {
        res.send({ message: "Internal error", error: e }).status(500);

    }

}