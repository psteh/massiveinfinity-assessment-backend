var express = require('express');
const moment = require('moment');

const productsJson = require('../products.json');
const Products = require('../controllers/Products');

var router = express.Router();

/**
 *  Initialize products to be inserted into the database
 */
router.get('/api/v1/product/init', Products.initialize);

/**
 *  Get all products available
 */
router.get('/api/v1/products', Products.getAll);

/**
 *  Get certain product by product ID
 */
router.get('/api/v1/product/:id', Products.getByID);

/**
 *  Update certain product by product ID
 */
router.put('/api/v1/product/:id', Products.update);

/**
 *  Search certain products by product brand or name
 */
router.post('/api/v1/products/search', Products.search);

module.exports = router;
