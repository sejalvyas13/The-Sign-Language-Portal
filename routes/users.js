const express = require('express');
const router = express.Router();
const data = require('../data');
const usersData = data.users;
const contributionsData = data.contributions;
const progressData = data.progress;
// var userInfoJson = require('../data/userInfo.json');

// Display user profile
router.get('/profile', async (req, res) => {
    if (req.session.AuthCookie === undefined) {
        res.render("login/notAuthorized", { isDisplayLogout: false });
    } else {
        try {
            const user = await usersData.getUserByUsername(req.session.AuthCookie);
            //console.log(typeof user);

            var contriFlag = false;
            var contributions;
            try {
                contributions = await contributionsData.getContributionsByContributorId(user._id.toString());
            } catch (error) {
                console.log(error)
                contriFlag = true;
            }

            
            //const contributions = await contributionsData.getContributionsByContributorId(user._id.toString());
            var progress;
            var progressflag = false;
            try {
                progress = await progressData.getProgressById(user._id.toString());
            } catch (error) {
                progressflag = true;
            }
            var contributionsVal = {};
            if(contriFlag){
                contributionsVal = "";
            }
            else{
                contributionsVal = contributions
            }

            var progressVal;

            if(progressflag){
                progressVal = "";
            }
            else{
                progressVal = progress;
            }
            var contriSize = Object.keys(contributionsVal).length;
            const allData = {
                userInfo: user,
                contributionsInfo: contriSize,
                progressInfo: progressVal
            }
            console.log(contributionsVal)
            res.render("users/profile", { userData: allData, isDisplayLogout: true });
        } catch (e) {
            res.status(500).json({ error: e });
        }
    }
});

module.exports = router;
