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
    var languageType = req.body.languageType;
    // var quiz_type = 'beginner';
    const allSigns = await signs.getAllSigns(languageType, quiz_type);
    /**TODO: Get userid from session */
    /**TODO : Do we give an option to take quiz anyway if there are no learned SLs?? I think yes? */

    try {
        res.send(JSON.stringify(allSigns));
        // res;
    } catch (e) {
        res.status(500).json({ error: e });
    }
});
    

module.exports = router;
