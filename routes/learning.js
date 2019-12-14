const express = require('express');
const router = express.Router();
const data = require('../data');
const signs = data.signs;
// var userInfoJson = require('../data/userInfo.json');
// const progress = data.progress;
// var counter = 0;

router.get('/', async (req, res) => {
    if (req.session.AuthCookie === undefined) {
        res.render("login/notAuthorized", { isDisplayLogout: false })
        // res.status(400).json({error : "Unauthorized"})
    } else {
        try {
            res.render("learning/learningMain", { isDisplayLogout: true });
        } catch (e) {
            res.status(500).json({ error: e });
        }
    }
});

router.post('/cardInit', async (req, res) => {
    if (req.session.AuthCookie === undefined) {
        res.render("login/notAuthorized", { isDisplayLogout: false })
        // res.status(400).json({error : "Unauthorized"})
    } else {
        try {
            if (req.body.signLanguage && req.body.level) {
                console.log("I'm okay")
                const signsData = await signs.getAllSigns(req.body.signLanguage, req.body.level);
                res.render("learning/learningCard", { sign: signsData[0], isDisplayLogout: true });  //Keep the same variable name 'sign'
            }
        } catch (e) {
            res.status(500).json({ error: e });
        }
    }
});

router.post('/card', async (req, res) => {
    if (req.session.AuthCookie === undefined) {
        res.render("login/notAuthorized", { isDisplayLogout: false })
        // res.status(400).json({error : "Unauthorized"})
    } else {
        try {
            console.log("Request " + req);
            console.log(req.body);
            console.log(req.body.language + " and " + req.body.level);
            if (req.body.language && req.body.level) {
                console.log("I'm okay")
                const signsData = await signs.getAllSigns(req.body.language, req.body.level);
                console.log(signsData);
                if (req.body.counter) {

                    res.send(signsData);
                }
                else {
                    console.log(signsData[0])
                    res.render("learning/learningCard", { sign: signsData[0], isDisplayLogout: true });
                }

            }
            else {
                /** TODO: Throw error and catch it */
            }

        } catch (e) {
            console.log(e)
            res.status(500).json({ error: e });
        }
    }
});

// router.post('/saveProgress', async (req, res) => {
//     try {

//         //res.render("learning/learningMain", { });
//     } catch (e) {
//         //res.status(500).json({ error: e });
//     }
// });


module.exports = router;
