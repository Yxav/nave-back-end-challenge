const express = require('express')
const router = express.Router()
const naver = require('../controllers/naver-controller')


router.post('/naver/register', naver.store)
router.get('/naver/', naver.index)
router.get('/naver/:id', naver.show)
router.put('/naver/:id', naver.update)
router.delete('/naver/:id', naver.delete)

module.exports = router;