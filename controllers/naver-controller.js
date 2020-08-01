const db = require('../database/db')

exports.store = async(req, res) => {

    const { name, birth_date, admission_date, job_role, projects, id_admin } = req.body;

    try {
        await db('navers').insert({
            name,
            birth_date,
            admission_date,
            job_role,
            projects,
            id_admin
        })
        console.log(req.body)
        res.send(req.body).status(200);
    } catch (e) {
        res.send({ message: "Internal error", error: e }).status(500);
    }
}


exports.index = async(req, res) => {
    // add filter by name and get all of current user
    try {
        const navers = await db('navers').select('id', 'name', 'birth_date', 'admission_date', 'job_role');
        res.send(navers).status(200)
    } catch (e) {
        res.send({ message: "Internal error", error: e }).status(500);

    }
}

exports.show = async(req, res) => {
    const { id } = req.params

    try {
        const naver = await db('navers')
            .where('id', id)
            .first()
        res.send(naver).status(200)

    } catch (e) {
        res.send({ message: "Internal error", error: e }).status(500);

    }
}

exports.update = async(req, res) => {

    const { id } = req.params;
    const { name, birth_date, admission_date, job_role, projects, id_admin } = req.body;

    try {
        await db('navers')
            .where('id', id)
            .update({
                name,
                birth_date,
                admission_date,
                job_role,
                projects,
                id_admin
            })
        res.send({ message: "Successful update" }).status(200);
    } catch (e) {
        res.send({ message: "Internal error", error: e }).status(500);
    }
}

exports.delete = async(req, res) => {
    const { id } = req.params

    try {
        const naver = await db('navers')
            .where('id', id)
            .first()
            .delete()
        res.send({ message: "Deleted" }).status(200)

    } catch (e) {
        res.send({ message: "Internal error", error: e }).status(500);
    }
}