const express = require('express');
const router = express.Router();
const data = require('../data');
const signs = data.signs;
const progress = data.progress;
const usersData = data.users;

router.get('/', async (req, res) => {
    if (req.session.AuthCookie === undefined) {
        res.render("login/notAuthorized", { isDisplayLogout: false })
        // res.status(400).json({error : "Unauthorized"})
    } else {
        try {
            res.render("quiz/quizMain", {isDisplayLogout: true});
        } catch (e) {
            res.status(500).json({ error: e });
        }
    }
});

router.post('/', async (req, res) => {
    
    if (req.session.AuthCookie === undefined) {
        res.render("login/notAuthorized", { isDisplayLogout: false })
        // res.status(400).json({error : "Unauthorized"})
    } else {
        console.log("body", req.body);
    var level = req.body.level;
    var language = req.body.language;
    var allSigns;
    // var quiz_type = 'beginner';
    //const allSigns = await signs.getAllSigns("ASL", quiz_type);
    /**TODO: Get userid from session */
    /**TODO : Do we give an option to take quiz anyway if there are no learned SLs?? I think yes? */
    var userdetails = await usersData.getUserByUsername(req.session.AuthCookie);
    console.log("Hi, I'm " + userdetails.username);
    console.log(userdetails._id);
        var userProgress = await progress.getProgressByUserId(userdetails._id);
        if (userProgress.learned_sl.length == 0) {
            allSigns = await signs.getAllSigns(language, level);
        }
        else {
            allSigns = await signs.getSignByArrayOfIds(userProgress.learned_sl, language, level);
            // if(typeof allSigns == 'object'){
            //     allSigns = [allSigns];
            // } 
        }
        try {
            console.log("allSigns", allSigns);
            res.send(JSON.stringify({ "allSigns": allSigns, "user_id": userdetails._id }));
        } catch (e) {
            res.status(500).json({ error: e });
        }
    }
});


module.exports = router;
