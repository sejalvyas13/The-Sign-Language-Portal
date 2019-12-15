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
            
            res.render("users/profile", { userData: allData, isDisplayLogout: true });
        } catch (e) {
            res.status(500).json({ error: e });
        }
    }
});

module.exports = router;
