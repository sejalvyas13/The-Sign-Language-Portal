const express = require('express');
const router = express.Router();
var fileName = 'data/userInfo.json';
var fs = require('fs');
// var userInfoJson = require('../data/userInfo.json');

router.get("/", (req, res) => {

  if (req.session.AuthCookie === undefined) {
    res.render("login/notAuthorized", { isDisplayLogout: false });
  } else {
    if (req.session.AuthCookie !== undefined) {
      req.session.destroy();
    }

    //reset usersInfo.json
    // userInfo = {
    //   "_id": null,
    //   "firstname": null,
    //   "lastname": null,
    //   "username": null,
    //   "hashedPwd": null,
    //   "userType": "normal",
    //   "profileViews": 0
    // }

    // fs.writeFile(fileName, JSON.stringify(userInfo), function (err) {
    //   if (err) return console.log(err);
    //   console.log("reset file:", JSON.stringify(userInfo));
    //   console.log('writing to ' + fileName);
    // });

    res.redirect("/login");
  }
});

module.exports = router;
