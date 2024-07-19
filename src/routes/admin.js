const express = require('express');
const router = express.Router();

router.get('/admin', (req, res) => {
    res.render("admin/adminpanel", {layout:null});
});

module.exports = router;