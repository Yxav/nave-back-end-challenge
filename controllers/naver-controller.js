const db = require('../database/db')
const jwt = require('jsonwebtoken')
const auth = require("../middlewares/authenticate")
const validator = require("../bin/helpers/validator-service")

exports.store = async(req, res) => {

    const { name, birth_date, admission_date, job_role, projects } = req.body;
    const id_admin = req.loggedUser.user.id;

    let validate = new validator();

    validate.isName(name);
    validate.isDate(birth_date);
    validate.isDate(admission_date);
    validate.isString(job_role);
    validate.isArray(projects);

    if (!validate.isValid()) {
        res.status(400).send(validate.errors()).end();

        return;
    }

    console.log(projects)

    try {
        await db('navers').insert({
            name,
            birth_date,
            admission_date,
            job_role,
            projects,
            id_admin
        })

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
            .select('id', 'name', 'birth_date', 'admission_date', 'job_role', 'projects')
            .where({
                'id': id,
                'id_admin': id_admin
            })
            .first()
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

    validate.isWord(name);
    validate.isDate(birth_date);
    validate.isDate(admission_date);
    validate.isWord(job_role);
    validate.isArray(projects);

    if (!validate.isValid()) {
        res.status(400).send(validate.errors()).end();

        return;
    }


    try {

        const data = await db('navers')
            .where({
                'id': id,
                'id_admin': id_admin
            })
            .update({
                name,
                birth_date,
                admission_date,
                job_role,
                projects
            })
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