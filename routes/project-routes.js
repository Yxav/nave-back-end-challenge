const express = require('express')
const router = express.Router()
const project = require('../controllers/project-controller')
const validator = require('../middlewares/validator')

//routes with validate
router.post('/projects/register', validator.projectRegister ,project.store)
router.put('/projects/:id', validator.projectRegister, project.update)


router.get('/projects', project.index)
router.get('/projects/:id', project.show)
router.delete('/projects/:id', project.delete)

module.exports = router;