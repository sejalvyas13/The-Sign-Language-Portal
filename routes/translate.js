const express = require('express');
const router = express.Router();
const data = require('../data');
// var userInfoJson = require('../data/userInfo.json');

router.get('/', async (req, res) => {
    if (req.session.AuthCookie === undefined) {
        res.render("login/notAuthorized", { isDisplayLogout: false });
    } else {
        try {
            res.render("translate/translateMain", { isDisplayLogout: true });
        } catch (e) {
            res.status(500).json({ error: e });
        }
    }
});


module.exports = router;
