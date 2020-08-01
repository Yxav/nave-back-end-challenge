const db = require('../database/db')

exports.store = async(req, res) => {
    const { name, navers, id_admin } = req.body;

    try {
        await db('projects').insert({
            id,
            name,
            navers,
            id_admin
        })

        res.send({ message: "Product registered" }).status(200);
    } catch (e) {
        res.send({ message: "Internal error", error: e }).status(500);
    }
}

exports.index = async(req, res) => {
    try {
        const projects = await db('projects').select('id', 'name')
        res.send(projects).status(200)
    } catch (e) {
        res.send({ message: "Internal error", error: e }).status(500);
    }
}

exports.show = async(req, res) => {
    const { id } = req.params

    try {
        const project = await db('projects')
            .where('id', id)
            .first()

        res.send(project).status(200)
    } catch (e) {
        res.send({ message: "Internal error", error: e }).status(500);

    }
}

exports.update = async(req, res) => {
    const { id } = req.params
    const { name, navers, id_admin } = req.body;

    try {
        await db('projects').where('id', id)
            .update({
                id,
                name,
                navers,
                id_admin
            })
        res.send({ message: "Updated" }).status(200)

    } catch (e) {
        res.send({ message: "Internal error", error: e }).status(500);

    }

}

exports.delete = async(req, res) => {
    const { id } = req.params

    try {
        await db('projects')
            .where('id', id)
            .first()
            .delete()
        res.send({ message: "Deleted" }).status(200)

    } catch (e) {
        res.send({ message: "Internal error", error: e }).status(500);

    }

}