const express = require('express');
const router = express.Router();
const data = require('../data');
const signData = data.signs;
// var userInfoJson = require('../data/userInfo.json');

router.post('/fromText', async (req, res) => {
    if (req.session.AuthCookie === undefined) {
        res.render("login/notAuthorized", { isDisplayLogout: false });
    } else {
        try {
            const text = req.body.text;
            console.log(text);
            const signObj = await signData.getSignByText(text.toLowerCase());
            console.log(signObj);
            //const sign = await signData.getSignByText();
            res.json(signObj);

        } catch (e) {
            console.log("in fromText")
            console.log(e)
            res.status(500).json({ error: e });
        }
    }
});

module.exports = router;
