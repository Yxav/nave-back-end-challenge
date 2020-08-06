const db = require('../database/db')
const validator = require("../bin/helpers/validator-service")


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
        const project = await db('projects').insert({
            name,
            id_admin
        }, 'id')


        if (navers) {
            const id_project = parseInt(project)
            for (var index_navers = 0; index_navers < navers.length; index_navers++) {
                console.log("hahaha")
                await db('project_navers').insert({
                    id_naver: navers[index_navers],
                    id_project,
                })
            }
        }

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
        let project = await db('projects')
            .select('id', 'name')
            .where({
                'id': id,
                'id_admin': id_admin
            })
            .first()

        const naver_id = await db('project_navers')
            .select('id_naver')
            .where('id_project', id)


        project.navers = []

        for (var index_id = 0; index_id < naver_id.length; index_id++) {

            project.navers.push(await db('navers')
                .select('id', 'name', 'birth_date', 'admission_date', 'job_role')
                .where('id', naver_id[index_id].id_naver)
                .first())


        }

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


    if (!validate.isValid()) {
        res.status(400).send(validate.errors()).end();
        return;
    }


    try {
        const project = await db('projects').update({
            name,
            id_admin
        }, 'id')

        if (navers) {
            const id_project = parseInt(project)
            for (var index_navers = 0; index_navers < navers.length; index_navers++) {
                console.log("hahaha")
                await db('project_navers').update({
                    id_naver: navers[index_navers],
                    id_project,
                })
            }
        }

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