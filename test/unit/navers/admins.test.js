import NaversController from 'controllers/navers'

describe(' Controllers: navers', () => {
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
    describe(' get() Navers', () => {
        it('Should return a list of navers', () => {
            expect(NaversController.index()).toEqual(defaultNaver)
        })
    })
})