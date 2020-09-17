const express = require('express')
const router = express.Router()
const admin = require('../controllers/admin-controller')
const validator = require('../middlewares/validator')

router.post('/register',validator.adminRegister ,admin.store)
router.post('/login', admin.login)

module.exports = router;