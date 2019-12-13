const express = require('express');
const router = express.Router();
const data = require('../data');
const usersData = data.users;

router.get('/', async (req, res) => {
    // try {
    //     res.render("dashboard/screen", { });
    // } catch (e) {
    //     res.status(500).json({ error: e });
    // }

    if (req.session.AuthCookie !== undefined) {
        var userdetails = undefined;
        try{
            userdetails = await usersData.getUserByUsername(req.session.AuthCookie);
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
