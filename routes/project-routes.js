const express = require('express')
const router = express.Router()
const project = require('../controllers/project-controller')

router.post('/projects/register', project.store)
router.get('/projects', project.index)
router.get('/projects/:id', project.show)
router.put('/projects/:id', project.update)
router.delete('/projects/:id', project.delete)

module.exports = router;