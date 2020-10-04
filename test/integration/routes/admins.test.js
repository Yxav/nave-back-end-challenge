import request from 'supertest'
import app from 'server'

import { TestDatabase } from 'helpers'

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
    
    beforeEach(async ()=> {
        await TestDatabase.createDB()
    })

    afterEach(async () => {
        await TestDatabase.destroyDB()
        global.server.close()
        
    })

    // describe('GET / Admins', () => {
    //     it('Shoud return a list of admins', done => {
    //         const response = request(global.server)
    //         .get('/v1/admins')
    //         .end((err, res) => {
    //             expect(res.body).toEqual(defaultNaver)
    //             done(err)
    //         })   
    //     })
    // })

     describe('POST /Admins', ()=> {
         it('Should create a new Admin', async() => {
             const response = await request(global.server)
             .post('/v1/admins')
             .send({
                 email: 'email@teste.com',
                 password: '123teste'
             })
             expect(response.status).toEqual(200)
             expect(response.type).toEqual('application/json')
             expect(Object.keys(response.body)).toEqual(
                expect.arrayContaining(['id', 'email'])
              )
              console.log(response.body)
         })
    })
})