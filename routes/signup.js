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

router.post('/checkUser', async (req, res) => {
    try {
        console.log("username", req.body.username);
        const user_id = await usersData.getUserByUsername(req.body.username);
        res.status(200).json({message: "Username already exists"});
    } catch (e) {
        res.status(200).json({ message: "" });
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
