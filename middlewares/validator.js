const validator = require('../bin/helpers/validator-service')


const naverRegister = (req, res, next) => {
    const rules = {
        name:'required|string' ,
        birthdate: 'required|date',
        admission_date: 'required|date',
        job_role: 'required|string',
        projects: 'array' 

    }

    validator(req.body, rules, {}, (err, status)=>{
        if(!status) {
            res.status(412)
                .send({
                    success:false,
                    message: 'Validation failed',
                    data:err
                })
        } else {
            next()
        }
    })
}

const projectRegister = (req, res, next) => {
    const rules = {
        name:'required|string' ,
        navers: 'array'
    }

    validator(req.body, rules, {}, (err, status)=>{
        if(!status) {
            res.status(412)
                .send({
                    success:false,
                    message: 'Validation failed',
                    data:err
                })
        } else {
            next()
        }
    })
}

const adminRegister = (req, res, next) => {
    const rules = {
        email:'required|email'
    }

    validator(req.body, rules, {}, (err, status)=>{
        if(!status) {
            res.status(412)
                .send({
                    success:false,
                    message: 'Validation failed',
                    data:err
                })
        } else {
            next()
        }
    })
}





module.exports = {
    naverRegister,
    projectRegister,
    adminRegister
}

















// var errors = [];

// const validationService = function() {
//     errors = [];
// }
// validationService.prototype.isName = function(value) {
//     var reg = new RegExp(/[a-z]$/);

//     if (!reg.test(value)) {
//         errors.push({ message: "This value must be a string" });
//     }
// }

// validationService.prototype.isEmail = function(value) {

//     var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
//     if (!reg.test(value)) {
//         errors.push({ message: "This value must be a valid email" });

//     }

// }
// validationService.prototype.isDate = function(value) {

//     var reg = new RegExp(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/);
//     if (!reg.test(value)) {
//         errors.push({ message: "This value must be a valid date" });

//     }
// }

// validationService.prototype.isString = function(value) {
//     var reg = new RegExp(/[a-zA-Z0-9]+/g);

//     if (!reg.test(value.trim(" "))) {
//         errors.push({ message: "This value must be a valid string, only letters and numbers" });

//     }
// }

// validationService.prototype.isArray = function(value) {

//     if (!Array.isArray(value)) {
//         errors.push({ message: "This value must be an array" });

//     }
// }

// validationService.prototype.errors = () => {
//     return errors;
// }

// validationService.prototype.clear = () => {
//     errors = [];
// }

// validationService.prototype.isValid = () => {
//     return errors.length == 0


// }

// module.exports = validationService;