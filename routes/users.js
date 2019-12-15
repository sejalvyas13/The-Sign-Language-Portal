const express = require('express');
const router = express.Router();
const data = require('../data');
const usersData = data.users;
const contributionsData = data.contributions;
const progressData = data.progress;

// Display user profile
router.get('/profile', async (req, res) => {
    if (req.session.AuthCookie === undefined) {
        res.render("login/notAuthorized", { isDisplayLogout: false });
    } else {
        try {
            //Get user
            const user = await usersData.getUserByUsername(req.session.AuthCookie);
            console.log(user);

            //Get contributions
            var contributions;
            try {
                contributions = await contributionsData.getContributionsByContributorId(user._id.toString());
            } catch (error) {
                console.log(error);
            }

            //get progress
            var progress;
            try {
                progress = await progressData.getProgressByUserId(user._id.toString());
            } catch (error) {
                console.log(error);
            }
            
            console.log("# of contris", contributions.length);
            const allData = {
                userInfo: user,
                contributionsInfo: contributions.length,
                progressInfo: progress
            }
<<<<<<< HEAD
            console.log("progress data")
            console.log(allData.progressInfo)
            var userdetails = await usersData.getUserByUsername(req.session.AuthCookie);
            console.log('logged in user id:', userdetails._id);
            var badge = {test_badge: "Bronze",contribution_badge : "Bronze"};
            if(allData.progressInfo.beginner + allData.progressInfo.intermediate + allData.progressInfo.advanced > 20){
                badge = {test_badge: "Gold",contribution_badge : "Bronze"};
            }
            else if(allData.progressInfo.beginner + allData.progressInfo.intermediate + allData.progressInfo.advanced > 10){
                badge = {test_badge: "Silver",contribution_badge : "Bronze"};
            }

            if(contributions.length > 20){
                badge.contribution_badge = "Gold";
            }
            else if(contributions.length > 10){
                badge.contribution_badge = "Silver";
            }
            console.log(badge)
            await progressData.updateBadgesProgress(userdetails._id, badge);
            res.render("users/profile", { userData: allData, isDisplayLogout: true, badges  : badge});
=======
            console.log(contributions)
            
            res.render("users/profile", { userData: allData, isDisplayLogout: true });
>>>>>>> 6852ac514df0381e3f508a46310dbaf935e949bd
        } catch (e) {
            res.status(500).json({ error: e });
        }
    }
});

module.exports = router;
