const express = require('express');
const router = express.Router();
const data = require('../data');

router.get('/', async (req, res) => {
    console.log("login get req", req.body);
    try {
        res.render("login/loginMain", { });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.post('/', async (req, res) => {
    try {
        res.render("login/loginMain", { });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});
    

module.exports = router;
