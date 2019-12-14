const express = require('express');
const router = express.Router();
const data = require('../data');
const signs = data.signs;
const progress = data.progress;
var userInfoJson = require('../data/userInfo.json');


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
    var allSigns;
    // var quiz_type = 'beginner';
    //const allSigns = await signs.getAllSigns("ASL", quiz_type);
    /**TODO: Get userid from session */
    /**TODO : Do we give an option to take quiz anyway if there are no learned SLs?? I think yes? */
    console.log("Hi, I'm " + userInfoJson.username);
    console.log(typeof userInfoJson._id)
    console.log(userInfoJson._id)
    if(!userInfoJson._id){
        res.status(400).json({error : "Unauthorized"})
    }
    else{
        var userProgress = await progress.getProgressByUserId(userInfoJson._id);
        if (userProgress.learned_sl.length == 0){
            allSigns = await signs.getAllSigns("ASL", quiz_type); 
        }
        else{
            allSigns = await signs.getSignByArrayOfIds(userProgress.learned_sl); 
            if(typeof allSigns == 'object'){
                allSigns = [allSigns];
            } 
        }
        try {
            console.log("allSigns");
            console.log(allSigns);
            res.send(JSON.stringify(allSigns));
            // res;
        } catch (e) {
            res.status(500).json({ error: e });
        }
    }
});
    

module.exports = router;
