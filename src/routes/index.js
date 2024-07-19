const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/', async  (req, res) => {
    const products = await pool.query('SELECT * FROM products');
    res.render('index', { products});
    
});

router.get('/producto/:id', async (req, res) => {
    const {id} = req.params;
        const productss = await pool.query('SELECT * FROM products WHERE id_pr = ?', [id]);
        res.render('products/detalles-product', {productss}); // Envia los datos a la vista
    console.log("consulto");
});



module.exports = router;