const express = require('express');
const router = express.Router();
const data = require('../data');
const usersData = data.users;

// var userInfoJson = require('../data/userInfo.json');

router.get('/', async (req, res) => {  
  if (req.session.AuthCookie === undefined) {
    res.render("login/notAuthorized", { isDisplayLogout: false });
  } else {
    var userdetails = await usersData.getUserByUsername(req.session.AuthCookie);
    console.log("userdetails", userdetails);
    res.render("dashboard/screen", { userdetails: userdetails, title: "Dashboard", isDisplayLogout: true });
  }
});

module.exports = router;
