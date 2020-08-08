const validator = require("../bin/helpers/validator-service")
const projectModel = require("../models/Project")
const naverModel = require("../models/Naver")




exports.store = async(req, res) => {

    const { name, navers } = req.body;
    const id_admin = req.loggedUser.user.id;

    let validate = new validator();

    validate.isString(name);

    if (!validate.isValid()) {
        res.status(400).send(validate.errors()).end();
        return;
    }

    try {
        const project = await projectModel.create({
            name,
            id_admin
        })


        if (navers) {
            const id_project = parseInt(project)
            for (var index_navers = 0; index_navers < navers.length; index_navers++) {
                await naverModel.createProjectNaver({
                    id_naver: navers[index_navers],
                    id_project,
                })
            }
        }

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
        const projects = await projectModel.index(query)

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
        let project = await projectModel.show({
            'id': id,
            'id_admin': id_admin
        })

        if (!project) {
            res.status(404).send({ message: "Project not found" })
            return
        }

        const naver_id = await projectModel.getNaverProject({ id_project: id })

        if (naver_id) {

            project.navers = []

            for (var index_id = 0; index_id < naver_id.length; index_id++) {

                project.navers.push(await naverModel.show({ id: naver_id[index_id].id_naver }))
            }
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

    let validate = new validator();

    validate.isString(name);


    if (!validate.isValid()) {
        res.status(400).send(validate.errors()).end();
        return;
    }


    try {
        const project = await projectModel.update({
            context: {
                name,
                id_admin
            },
            condition: {
                id: id
            }
        })

        const naversArr = await naverModel.showProject({ id_project: id })


        const id_project = parseInt(project)

        if (navers.length == naversArr.length) {

            for (var index_navers = 0; index_navers < navers.length; index_navers++) {
                await naverModel.updateProject({
                    condition: {
                        id_project: id_project
                    },
                    context: {
                        id_naver: navers[index_navers],
                        id_project,
                    }
                })
            }
        }

        await naverModel.deleteNaversProject({ id_project: id })

        for (var index_navers = 0; index_navers < navers.length; index_navers++) {
            await naverModel.createProjectNaver({
                id_naver: navers[index_navers],
                id_project,
            })
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
        await projectModel.delete({
            'id': id,
            'id_admin': id_admin
        })
        res.send({ message: "Deleted" }).status(200)

    } catch (e) {
        res.status(500).send({ message: "Internal error", error: e });

    }

}