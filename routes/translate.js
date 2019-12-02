const express = require('express');
const router = express.Router();
const data = require('../data');

router.get('/', async (req, res) => {
    try {
        res.render("translate/translateMain", { });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});
    

module.exports = router;
