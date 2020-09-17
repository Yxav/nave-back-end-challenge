const jwt = require('jsonwebtoken')
const auth = require("../middlewares/authenticate")
const knex = require('knex')
const Naver = require('../models/Naver')

exports.store = async(req, res) => {

    const { name, birthdate, admission_date, job_role, projects } = req.body;
    const id_admin = req.loggedUser.user.id;

    try {
        const naver = await Naver
                .query()
                .insert({
                        name,
                        birthdate,
                        admission_date,
                        job_role,
                        projects,
                        id_admin
                })

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
        const navers = await Naver
                .query()
                .select('id', 'name', 'birthdate', 'admission_date', 'job_role','projects')
                .where(query)

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
        const naver = await Naver
                .query()
                .select('id', 'name', 'birthdate', 'admission_date', 'job_role')
                .where({
                    'id': id,
                    'id_admin': id_admin
                })
                .first()

        if (!naver) {
            res.status(404).send({ message: "Naver not found" })
            return
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

   
    try {
        const data = {
            content: {
                name,
                birthdate,
                admission_date,
                job_role,
                projects,
            },
            id: {
                'id': id,
                'id_admin': id_admin
            }
        }
        const naver = await Naver
                    .query()
                    .where(data.id)
                    .patch(data.content)

    
        res.status(200).send(req.body);
    } catch (e) {
        res.status(500).send({ message: "Internal error", error: e });
    }
}

exports.delete = async(req, res) => {
    const { id } = req.params
    const id_admin = req.loggedUser.user.id;

    try {
        await Naver
            .query()
            .delete()
            .where({
                'id': id,
                'id_admin': id_admin
            })

        res.send({ message: "Deleted" }).status(200)

    } catch (e) {
        res.status(500).send({ message: "Internal error", error: e });
    }
}