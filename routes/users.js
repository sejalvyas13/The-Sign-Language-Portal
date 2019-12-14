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
            const contributions = await contributionsData.getContributionsById(user._id);
            const progress = await progressData.getProgressById(user._id);

            const allData = {
                userInfo: user,
                contributionsInfo: contributions,
                progressInfo: progress
            }

            res.render("users/profile", { userData: allData, isDisplayLogout: true });
        } catch (e) {
            res.status(500).json({ error: e });
        }
    }

});

module.exports = router;
