const express = require('express');
const router = express.Router();
const data = require('../data');
const usersData = data.users;
const xss = require('xss');

const bcrypt = require("bcrypt");

async function matchHash(plainPwd, hashPwd) {
  let compareTopwd = false;

  try {
    compareTopwd = await bcrypt.compare(plainPwd, hashPwd);
  } catch (e) {
  }
  return compareTopwd;
}

router.get("/", async (req, res, next) => {
  if (req.session.AuthCookie !== undefined) {
    res.redirect("/dashboard");
  } else {
    res.render("login/loginMain", { hasError: false, title: "Login", isDisplayLogout: false });
  }
});

router.post("/", async (req, res) => {
  if (req.session.AuthCookie === undefined) {
    const userInfo = req.body;
    var userdetails = undefined;
    try {
      userdetails = await usersData.getUserByUsername(xss(userInfo.username));
    } catch (e) {
      res.render("login/loginMain", { hasError: true, title: "Login", error: e, isDisplayLogout: false });
    }

    const isMatch = await matchHash(userInfo.password, userdetails.hashedPwd);
    if (isMatch) {
      //store a cookie
      req.session.AuthCookie = userInfo.username;

      //set userInfo json
      // userInfoJson._id = userdetails._id.toString();
      // userInfoJson.firstname = userdetails.firstname;
      // userInfoJson.lastname = userdetails.lastname;
      // userInfoJson.username = userdetails.username;
      // userInfoJson.hashedPwd = userdetails.hashedPwd;
      // userInfoJson.userType = userdetails.userType;
      // userInfoJson.profileViews = userdetails.profileViews;

      // fs.writeFile('data/userInfo.json', JSON.stringify(userInfoJson), function (err) {
      //   if (err) return console.log(err);
      //   console.log("updated file:", JSON.stringify(userInfoJson));
      //   console.log("writing to " + 'data/userInfo.json');
      // });

      res.redirect("/dashboard");
    } else {
      res.render("login/loginMain", {
        hasError: true, title: "Login", isDisplayLogout: false,
        error: "Either username and/or password doesn't match"
      });
    }
  } else {
    res.redirect("/dashboard");
  }
});



module.exports = router;
