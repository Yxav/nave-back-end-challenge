import Admin from 'models/Admin'



export const index = ctx => {
    return ctx.body = [
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
}

export const create = ctx => {
    const { body } = ctx.request
    // console.log(body)
    return Admin.query().insert({
        email: body.email,
        password: body.password
    })

    // console.log(response)
    
}


export default { 
    index,
    create
 }