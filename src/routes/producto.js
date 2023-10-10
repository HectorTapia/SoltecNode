const express = require('express');
const router = express.Router();

router.get('/producto', (req, res) => {
    res.render("products/detalles-product");
});

module.exports = router;