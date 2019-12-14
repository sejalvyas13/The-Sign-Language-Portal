const express = require('express');
const router = express.Router();
const data = require('../data');
const usersData = data.users;
const progress = data.progress;
var userInfoJson = require('../data/userInfo.json');

router.get('/', async (req, res) => {
    // try {
    //     res.render("dashboard/screen", { });
    // } catch (e) {
    //     res.status(500).json({ error: e });
    // }

    if (req.session.AuthCookie !== undefined) {
        console.log("userinfojson")
        console.log(userInfoJson)
        var userdetails = undefined;
        try{
            userdetails = await usersData.getUserByUsername(req.session.AuthCookie);
            userInfoJson._id = userdetails._id.toString();
            userInfoJson.firstname = userdetails.firstname;
            userInfoJson.lastname = userdetails.lastname;                        
            userInfoJson.username = userdetails.username;
            userInfoJson.hashedPwd = userdetails.hashedPwd;
            userInfoJson.userType = userdetails.userType;
            userInfoJson.profileViews = userdetails.profileViews; 
            try{
              await progress.addProgress(userInfoJson._id);                                   
            }
            catch(e){
              console.log("failed to add progress");
            }
        }catch(e){
            res.render("login/loginMain", { hasError: true, title: "Login", error:e });
        }
        
        res.render("dashboard/screen", { userdetails: userdetails, title: "Dashboard" });
      } else {
        res.render("login/notAuthorized", { status_code: 403, title:"Not logged in!" });
        res.status(403);
      }
});


    

module.exports = router;
