const express = require('express');
const router = express.Router();
const data = require('../data');
const signs = data.signs;
const progress = data.progress;
const usersData = data.users;
const progressData = data.progress;

router.get('/', async (req, res) => {
    if (req.session.AuthCookie === undefined) {
        res.render("login/notAuthorized", { isDisplayLogout: false })
        // res.status(400).json({error : "Unauthorized"})
    } else {
        try {
            res.render("quiz/quizMain", { isDisplayLogout: true });
        } catch (e) {
            res.status(500).json({ error: e });
        }
    }
});

router.post('/completed', async (req, res) => {
    if (req.session.AuthCookie === undefined) {
        res.render("login/notAuthorized", { isDisplayLogout: false })
        // res.status(400).json({error : "Unauthorized"})
    } else {
        console.log("quiz scores", req.body);
        try {
            res.render("quiz/quizCompleted", {
                isDisplayLogout: true, trueCount: req.body.trueCount,
                totalQue: req.body.totalQue
            });
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
        // var allSigns;
        var finalSignsData = [];
        // var quiz_type = 'beginner';
        //const allSigns = await signs.getAllSigns("ASL", quiz_type);
        /**TODO: Get userid from session */
        /**TODO : Do we give an option to take quiz anyway if there are no learned SLs?? I think yes? */
        var userdetails = await usersData.getUserByUsername(req.session.AuthCookie);
        console.log("Hi, I'm " + userdetails.username);
        console.log(userdetails._id);
        var userProgress = await progress.getProgressByUserId(userdetails._id);
        if (userProgress.learned_sl.length == 0) {
            finalSignsData = await signs.getAllSigns(language, level);
        }
        else {
            // allSigns = await signs.getSignByArrayOfIds(userProgress.learned_sl, language, level);
            // if(typeof allSigns == 'object'){
            //     allSigns = [allSigns];
            // } 
            console.log("I'm okay");
            const signsData = await signs.getAllSigns(language, level);
            const user = await usersData.getUserByUsername(req.session.AuthCookie);
            const learnedSignsData = await progressData.getProgressByUserId(user._id);

            var allSignIds = [];
            // var finalSignsData = [];
            var learnedSigns = [];
            // var notLearnedSigns = [];

            signsData.forEach(sign => {
                // console.log("type all", typeof(sign._id.toString()));
                allSignIds.push(sign._id.toString());
            });
            ///
            learnedSignsData.learned_sl.forEach(id => {
                // console.log("type learned", typeof(id.toString()));
                learnedSigns.push(id.toString());
            });
            ///

            // allSignIds.forEach(id => {
            //     if(!learnedSignsData.learned_sl.includes(id)){
            //         console.log("new");
            //         notLearnedSigns.push(id.toString());
            //     }
            // });
            const notLearnedSigns = allSignIds.filter(x => !learnedSigns.includes(x));

            signsData.forEach(s => {
                if (notLearnedSigns.includes(s._id.toString())) {
                    finalSignsData.push(s);
                }
            });

            console.log("allSignIds", allSignIds);
            console.log("notLearnedSigns", notLearnedSigns);
        }
        try {
            console.log("allSigns", finalSignsData);
            res.send(JSON.stringify({ "allSigns": finalSignsData, "user_id": userdetails._id }));
        } catch (e) {
            res.status(500).json({ error: e });
        }
    }
});


module.exports = router;
