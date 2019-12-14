const express = require('express');
const router = express.Router();
const data = require('../data');
const usersData = data.users;
const progressData = data.progress;

const bcrypt = require("bcrypt");
const saltRounds = 12;

function getHashedPwd(plainPwd) {
    return bcrypt.hash(plainPwd, saltRounds);
}

router.get('/', async (req, res) => {
    try {
        res.render("signup/signupMain", { isDisplayLogout: false });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.post('/', async (req, res) => {
    //destroy any previous session
    if (req.session.AuthCookie !== undefined) {
        req.session.destroy();
    }

    console.log(req.body);
    var hashedPwd = await getHashedPwd(req.body.password);
    console.log("hashed pwd:", hashedPwd);
    try {
        // TODO: response from create method can be removed
        const user_id = await usersData.create(req.body.firstname, req.body.lastname,
            req.body.username, hashedPwd);
        await progressData.addProgress(user_id);

        res.redirect("login/");
    } catch (e) {
        res.status(500).json({ error: e });
    }
});


module.exports = router;
