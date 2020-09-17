const Project = require("../models/Project")


exports.store = async(req, res) => {

    const { name, navers } = req.body;
    const id_admin = req.loggedUser.user.id;

    try {
        const project = await Project
            .query()
            .insert({
                    name,
                    navers,
                    id_admin
                })

        res.status(200).send(req.body)


    } catch (e) {
        res.status(500).send({ message: "Internal error", error: e });
    }
}

exports.index = async(req, res) => {
    const id_admin = req.loggedUser.user.id;
    const { name } = req.query
    let query = {}

    query.id_admin = id_admin

    if (name != null) {
        query.name = name
    }

    try {
        const projects = await Project
            .query()
            .select('id', 'name', 'navers')
            .where(query)
            
        if (projects.length == 0) {
            res.status(404).send({ message: "There aren't projects" })
            return
        }

        res.send(projects).status(200)
    } catch (e) {
        res.status(500).send({ message: "Internal error", error: e });
    }
}

exports.show = async(req, res) => {
    const { id } = req.params
    const id_admin = req.loggedUser.user.id;
    try {
        let project = await Project
        .query()
        .select('id', 'name')
        .where({
            'id': id,
            'id_admin': id_admin
        })
        .first()

        if (!project) {
            res.status(404).send({ message: "Project not found" })
            return
        }

        res.status(200).send(project)

    } catch (e) {
        res.status(500).send({ message: "Internal error", error: e });

    }
}

exports.update = async(req, res) => {
    const { id } = req.params
    const { name, navers } = req.body;
    const id_admin = req.loggedUser.user.id;

    try {
        const project = await Project
            .query()
            .where({
                id: id,
                navers,
                id_admin
            })
            .patch({
                name
                })

        if (project == 0) {
            res.status(404).send({ message: "Project not found" })

        }

        res.status(200).send(req.body);


    } catch (e) {
        res.status(500).send({ message: "Internal error", error: e });

    }

}

exports.delete = async(req, res) => {

    const { id } = req.params
    const id_admin = req.loggedUser.user.id;


    try {
        await Project
            .query()
            .where({
                'id': id,
                'id_admin': id_admin
            })
            .delete()

        res.send({ message: "Deleted" }).status(200)

    } catch (e) {
        res.status(500).send({ message: "Internal error", error: e });

    }

}