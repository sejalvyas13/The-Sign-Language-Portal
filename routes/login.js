const express = require('express');
const router = express.Router();
const data = require('../data');
const usersData = data.users;

const bcrypt = require("bcrypt");
const saltRounds = 12;

async function matchHash(plainPwd, hashPwd) {
  let compareTopwd = false;

  try {
    compareTopwd = await bcrypt.compare(plainPwd, hashPwd);
  } catch (e) {
  }
  return compareTopwd;
}


// router.get('/', async (req, res) => {
//     console.log("login get req", req.body);
//     try {
//         res.render("login/loginMain", { });
//     } catch (e) {
//         res.status(500).json({ error: e });
//     }
// });

router.get("/", async (req, res, next) => {
  if (req.session.AuthCookie !== undefined) {
    res.redirect("/dashboard");
  } else {
    res.render("login/loginMain", { hasError: false, title: "Login" });
  }
});

// app.get("/private", (req, res, next) => {
//   // console.log("private:", req.session);
//   if (req.session.AuthCookie !== undefined) {
//     var userdetails = undefined;
//     usersData.forEach(user => {
//       if (user.username === req.session.AuthCookie) {
//         userdetails = user;
//       }
//     });
//     res.render("layouts/userProfile", { userdetails: userdetails, title: "User Details" });
//   } else {
//     res.render("layouts/notLoggedIn", { status_code: 403, title:"Not logged in!" });
//     res.status(403);
//   }
// });

router.post("/", async (req, res) => {
  if (req.session.AuthCookie === undefined) {
    const userInfo = req.body;
    var userdetails = undefined;
    try{
        userdetails = await usersData.getUserByUsername(userInfo.username);
    }catch(e){
        res.render("login/loginMain", { hasError: true, title: "Login", error:e });
    }
    
    // var hashPwd = userdetails.hashedPwd;
    // undefined;
    // usersData.forEach(user => {
    //   if (user.username === userInfo.username) {
    //     hashPwd = user.hashedPassword;
    //   }
    // });

    const isMatch = await matchHash(userInfo.password, userdetails.hashedPwd);
    if (isMatch) {
      //store a cookie
      req.session.AuthCookie = userInfo.username;
      // console.log("inside login:", req.session);
      res.redirect("/dashboard");
    } else {
      res.render("login/loginMain", { hasError: true, title: "Login", 
        error:"Response status code(401): Please provide valid username and/or password" });
    }
  } else {
    res.redirect("/dashboard");
  }
});

router.get("/logout", (req, res) => {
  if (req.session.AuthCookie !== undefined) {
    req.session.destroy();

    // show 'you have been logged out' message
    res.render("layouts/logout", {title: "Logged Out"});
  } else {
    res.redirect("/login");
  }

});


// router.post('/', async (req, res) => {
//     try {
//         res.render("login/loginMain", { });
//     } catch (e) {
//         res.status(500).json({ error: e });
//     }
// });
    

module.exports = router;
