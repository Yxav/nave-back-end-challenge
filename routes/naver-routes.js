const express = require('express')
const router = express.Router()

const naver = require('../controllers/naver-controller')
const validator = require('../middlewares/validator')


//routes with validation
router.post('/naver/register', validator.naverRegister, naver.store)
router.put('/naver/:id', validator.naverRegister, naver.update)

router.get('/naver/:id', naver.show)
router.delete('/naver/:id', naver.delete)


router.get('/naver/', naver.index)

module.exports = router;