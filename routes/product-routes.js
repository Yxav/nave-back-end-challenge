const express = require('express')
const router = express.Router()
const product = require('../controllers/product-controller')

router.post('/products/register', product.store)
router.get('/products', product.index)
router.get('/products/:id', product.show)
router.put('/products/:id', product.update)
router.delete('/products/:id', product.delete)

module.exports = router;