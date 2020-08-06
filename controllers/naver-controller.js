const db = require('../database/db')
const jwt = require('jsonwebtoken')
const auth = require("../middlewares/authenticate")
const validator = require("../bin/helpers/validator-service")
const knex = require('knex')

exports.store = async(req, res) => {

    const { name, birth_date, admission_date, job_role, projects } = req.body;
    const id_admin = req.loggedUser.user.id;

    let validate = new validator();

    validate.isName(name);
    validate.isDate(birth_date);
    validate.isDate(admission_date);
    validate.isString(job_role);


    if (!validate.isValid()) {
        res.status(400).send(validate.errors()).end();
        return;
    }

    try {
        const naver = await db('navers').insert({
            name,
            birth_date,
            admission_date,
            job_role,
            id_admin
        }, 'id')

        if (projects) {
            const id_naver = parseInt(naver)
            for (var index_projects = 0; index_projects < projects.length; index_projects++) {
                console.log("hahaha")
                const data = {
                    id_naver,
                    id_project: projects[index_projects]
                }
                await db('project_navers').insert(data)
            }
        }
        console.table(req.body)
        res.send(req.body).status(200);
    } catch (e) {
        res.send({ message: "Internal error", error: e }).status(500);
    }
}


exports.index = async(req, res) => {
    const id_admin = req.loggedUser.user.id;

    try {
        const navers = await db('navers')
            .select('id', 'name', 'birth_date', 'admission_date', 'job_role')
            .where('id_admin', id_admin);
        res.send(navers).status(200)
    } catch (e) {
        res.send({ message: "Internal error", error: e }).status(500);

    }
}

exports.show = async(req, res) => {
    const { id } = req.params
    const id_admin = req.loggedUser.user.id;

    try {
        const naver = await db('navers')
            .select('id', 'name', 'birth_date', 'admission_date', 'job_role')
            .where({
                'id': id,
                'id_admin': id_admin
            })
            .first()


        const project_id = await db('project_navers')
            .select('id_project')
            .where('id_naver', id)

        naver.projects = []

        for (var index_id = 0; index_id < project_id.length; index_id++) {

            naver.projects.push(await db('projects')
                .select('id', 'name')
                .where('id', project_id[index_id].id_project)
                .first())
        }

        res.send(naver).status(200)

    } catch (e) {
        res.send({ message: "Internal error", error: e }).status(500);

    }
}

exports.update = async(req, res) => {

    const { id } = req.params;
    const { name, birth_date, admission_date, job_role, projects } = req.body;
    const id_admin = req.loggedUser.user.id;

    let validate = new validator();

    validate.isName(name);
    validate.isDate(birth_date);
    validate.isDate(admission_date);
    validate.isString(job_role);

    if (!validate.isValid()) {
        res.status(400).send(validate.errors()).end();

        return;
    }

    try {

        const naver = await db('navers').update({
            name,
            birth_date,
            admission_date,
            job_role,
            id_admin
        }, 'id')

        if (projects) {
            const id_naver = parseInt(naver)
            for (var index_projects = 0; index_projects < projects.length; index_projects++) {
                console.log("hahaha")
                const data = {
                    id_naver,
                    id_project: projects[index_projects]
                }
                await db('project_navers').insert(data)
            }
        }
        console.log(data)
        res.send({ message: "Successful update" }).status(200);
    } catch (e) {
        res.send({ message: "Internal error", error: e }).status(500);
    }
}

exports.delete = async(req, res) => {
    const { id } = req.params
    const id_admin = req.loggedUser.user.id;

    try {
        const naver = await db('navers')
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