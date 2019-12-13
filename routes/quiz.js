const express = require('express');
const router = express.Router();
const data = require('../data');
const signs = data.signs;

router.get('/', async (req, res) => {
    try {
        res.render("quiz/quizMain", { });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.post('/', async (req, res) => {
    console.log("body", req.body);
    var quiz_type = req.body.quiz_type;
    // var quiz_type = 'beginner';
    const allSigns = await signs.getSignsByType(quiz_type);
    try {
        res.send(JSON.stringify(allSigns));
        // res;
    } catch (e) {
        res.status(500).json({ error: e });
    }
});
    

module.exports = router;
