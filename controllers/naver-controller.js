const jwt = require('jsonwebtoken')
const auth = require("../middlewares/authenticate")
const validator = require("../bin/helpers/validator-service")
const knex = require('knex')
const naverModel = require("../models/Naver")
const projectModel = require("../models/Project")

exports.store = async(req, res) => {

    const { name, birthdate, admission_date, job_role, projects } = req.body;
    const id_admin = req.loggedUser.user.id;

    let validate = new validator();

    validate.isName(name);
    validate.isDate(birthdate);
    validate.isDate(admission_date);
    validate.isString(job_role);


    if (!validate.isValid()) {
        res.status(400).send(validate.errors()).end();
        return;
    }

    try {
        const naver = await naverModel.createNaver({
            name,
            birthdate,
            admission_date,
            job_role,
            id_admin
        })

        if (projects) {
            const id_naver = parseInt(naver)
            for (var index_projects = 0; index_projects < projects.length; index_projects++) {
                await naverModel.createProjectNaver({
                    id_naver,
                    id_project: projects[index_projects]
                })
            }
        }
        res.send(req.body).status(200);
    } catch (e) {
        res.status(500).send({ message: "Internal error", error: e });
    }
}

exports.index = async(req, res) => {
    const id_admin = req.loggedUser.user.id;
    const { name, admission_date, job_role } = req.query
    let query = {}

    query.id_admin = id_admin


    if (name != null) {
        query.name = name;
    }
    if (admission_date != null) {
        query.admission_date = admission_date;
    }
    if (job_role != null) {
        query.job_role = job_role;
    }

    try {
        const navers = await naverModel.index(query)

        if (navers.length == 0) {
            res.status(404).send({ message: "There aren't navers" })
            return
        }

        res.send(navers).status(200)
    } catch (e) {
        res.status(500).send({ message: "Internal error", error: e });

    }
}

exports.show = async(req, res) => {
    const { id } = req.params
    const id_admin = req.loggedUser.user.id;

    try {
        const naver = await naverModel.show({
            'id': id,
            'id_admin': id_admin
        })

        if (!naver) {
            res.status(404).send({ message: "Naver not found" })
            return
        }

        const project_id = await naverModel.showProject({ 'id_naver': id })


        naver.projects = []

        for (var index_id = 0; index_id < project_id.length; index_id++) {

            naver.projects.push(await projectModel.show({ id: project_id[index_id].id_project }))

        }

        res.send(naver).status(200)

    } catch (e) {
        res.status(500).send({ message: "Internal error", error: e });

    }
}

exports.update = async(req, res) => {

    const { id } = req.params;
    const { name, birthdate, admission_date, job_role, projects } = req.body;
    const id_admin = req.loggedUser.user.id;

    let validate = new validator();

    validate.isName(name);
    validate.isDate(birthdate);
    validate.isDate(admission_date);
    validate.isString(job_role);

    if (!validate.isValid()) {
        res.status(400).send(validate.errors()).end();

        return;
    }

    try {
        const data = {
            content: {
                name,
                birthdate,
                admission_date,
                job_role,
                id_admin
            },
            id: {
                'id': id
            }
        }
        const naver = await naverModel.update(data)

        const id_naver = parseInt(naver)

        const arrProject = await naverModel.showProject({ id_naver: id })

        if (projects.length == arrProject.length) {
            for (var index_projects = 0; index_projects < projects.length; index_projects++) {
                await naverModel.updateProject({
                    context: {
                        id_project: projects[index_projects]
                    },
                    condition: {
                        'id_naver': id_naver
                    }
                })
            }
        }

        await naverModel.deleteNaversProject({ id_naver: id })

        for (var index_projects = 0; index_projects < projects.length; index_projects++) {

            await naverModel.createProjectNaver({
                id_naver,
                id_project: projects[index_projects]
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
        await naverModel.delete({
            'id': id,
            'id_admin': id_admin
        })

        res.send({ message: "Deleted" }).status(200)

    } catch (e) {
        res.status(500).send({ message: "Internal error", error: e });
    }
}