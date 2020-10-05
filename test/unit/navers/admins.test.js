import AdminsController from 'controllers/admins'

describe(' Controllers: admins', () => {
    const defaultAdmin = [
        {
            id: 1,
            email: 'teste@teste.com',
        }
        ]
    describe(' get() Admins', () => {
        it('Should create a admin', () => {
            
            expect(AdminsController.create()).toEqual(defaultAdmin)
        })
    })
})