const express = require('express');
const router = express.Router();

const pool = require('../database');


router.post('/add', async (req, res) => {
    const { nombre_pr,description_pr,price_pr,price_ant_pr,image_1_pr,image_2_pr,image_3_pr,image_4_pr } = req.body;
    const newProducto = {
        nombre_pr,
        description_pr,
        price_pr,
        price_ant_pr,
        image_1_pr,
        image_2_pr,
        image_3_pr,
        image_4_pr
    };
    await pool.query('INSERT INTO products set ?', [newProducto]);
    res.redirect('/admin');
});

router.get('/list', async (req, res) => {
    const productoslist = await pool.query('SELECT * FROM products');
    res.json(productoslist);
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM products WHERE id_pr = ?', [id]);   
    res.redirect('/admin'); 
    
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    console.log("entro a edit" + id);
    const producto = await pool.query('SELECT * FROM products WHERE id_pr = ?', [id]);
    res.render('partials/modal',{producto}); 
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre_pr,description_pr,price_pr,price_ant_pr,image_1_pr,image_2_pr,image_3_pr,image_4_pr } = req.body;
    const newProducto = {
        nombre_pr,
        description_pr,
        price_pr,
        price_ant_pr,
        image_1_pr,
        image_2_pr,
        image_3_pr,
        image_4_pr
    };
    const links = await pool.query('UPDATE products set ? WHERE id_pr = ?', [newProducto, id]);
    res.redirect('/admin'); 
});

module.exports = router;