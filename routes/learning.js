const express = require('express');
const router = express.Router();
const data = require('../data');
const signs = data.signs;
const progress = data.progress;
const url = require('url');
var counter = 0;
const paginate = require('express-paginate');

router.get('/', async (req, res) => {
    try {
        res.render("learning/learningMain", { });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.post('/cardInit', async (req, res) => {
    try {
        if (req.body.signLanguage && req.body.level){
            console.log("I'm okay")
            const signsData = await signs.getAllSigns(req.body.signLanguage, req.body.level);
            res.render("learning/learningCard", {sign : signsData[0] });  //Keep the same variable name 'sign'
        }
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.post('/card', async (req, res) => {
    try {
        console.log("Request " + req);
        console.log(req.body);
        console.log(req.body.language + " and "+req.body.level);
        if (req.body.language && req.body.level){
            console.log("I'm okay")
            const signsData = await signs.getAllSigns(req.body.language, req.body.level);
            console.log(signsData);
            if(req.body.counter){
                
                res.send(signsData)
            }
            else{
                console.log(signsData[0])
                res.render("learning/learningCard", {sign : signsData[0]});
            }

        }
        else {
            /** TODO: Throw error and catch it */
        }
        
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: e });
    }
});

router.post('/saveProgress', async (req, res) => {
    try {

        //res.render("learning/learningMain", { });
    } catch (e) {
        //res.status(500).json({ error: e });
    }
});
    

module.exports = router;
