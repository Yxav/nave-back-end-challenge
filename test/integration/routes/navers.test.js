import request from 'supertest'
import app from '../../../src/server'

describe('Routes: Navers', () => {
    const defaultNaver = [
        {
            id: 1,
            name: 'Fulano',
            birthdate: '1999-05-15',
            admission_date: '2020-06-12',
            job_role: 'Desenvolvedor'
        },
        {
            id: 2,
            name: 'Ciclano',
            birthdate: '1992-10-28',
            admission_date: '2018-06-12',
            job_role: 'Desenvolvedor'
        }
    ]
    global.server = app.listen()
    describe('GET / Navers', () => {
        it('Shoud return a list of navers', done => {
            const response = request(global.server)
            .get('/navers')
            .end((err, res) => {
                expect(res.body).toEqual(defaultNaver)
                done(err)
            })   
        })
    })
})