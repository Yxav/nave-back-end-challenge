const express = require('express')
const router = express.Router()
const admin = require('../controllers/admin-controller')

router.post('/register', admin.store)

module.exports = router;