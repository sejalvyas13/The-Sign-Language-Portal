const express = require('express');
const router = express.Router();
const data = require('../data');
const signs = data.signs;
const progressData = data.progress;
const usersData = data.users;

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

router.get('/completed', async (req, res) => {
    if (req.session.AuthCookie === undefined) {
        res.render("login/notAuthorized", { isDisplayLogout: false })
        // res.status(400).json({error : "Unauthorized"})
    } else {
        try {
            res.render("learning/learningCompleted", { isDisplayLogout: true });
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
                console.log("I'm okay");
                const signsData = await signs.getAllSigns(req.body.language, req.body.level);
                const user = await usersData.getUserByUsername(req.session.AuthCookie);
                const learnedSignsData = await progressData.getProgressByUserId(user._id);

                var allSignIds = [];
                var finalSignsData = [];
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
                    if(notLearnedSigns.includes(s._id.toString())){
                        finalSignsData.push(s);
                    }
                });

                console.log("allSignIds", allSignIds);
                console.log("notLearnedSigns", notLearnedSigns);
                // console.log("notLearnedSigns", notLearnedSigns);

                if (req.body.counter) {
                    res.send(finalSignsData);
                }else if(finalSignsData.length == 1){
                    res.redirect('completed');
                }
                else {
                    console.log(finalSignsData[0])
                    res.render("learning/learningCard", { sign: finalSignsData[0], isDisplayLogout: true });
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
