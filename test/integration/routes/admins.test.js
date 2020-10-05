import request from 'supertest'
import app from 'server'

import { TestDatabase } from 'helpers'
import AdminFactory from './factory/admin-factory'



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
    
    beforeEach(async ()=> {
        await TestDatabase.createDB()
        global.server = app.listen()
        global.admin = await AdminFactory()
    })

    afterEach(async () => {
        await TestDatabase.destroyDB()
        global.server.close()
        
    })

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
         })
    })

    describe('POST /Admins', ()=> {
        it('Should login a Admin and return a token', async() => {
            const response = await request(global.server)
            .post('/v1/admins/login')
            .send({
                email: global.admin.email,
                password: global.admin.password
            })
            expect(response.status).toEqual(200)
            expect(response.type).toEqual('application/json')
            expect(Object.keys(response.body)).toEqual(
                expect.arrayContaining(['id', 'email', 'token'])
                )
        })
    })
})