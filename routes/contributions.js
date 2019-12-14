const express = require('express');
const path = require("path");
const fs = require("fs");
const router = express.Router();
const data = require('../data');
const contributionData = data.contributions;
var userInfoJson = require('../data/userInfo.json');

// Json schema validator
// const djv = require('djv');
// const env = djv();

// const jsonSchema = {
//     "required": [
//         "sl_type",
//         "sl_media_path",
//         "sl_text"
//     ]
// };

// // Add json-schema
// env.addSchema('post', jsonSchema);


router.get('/', async (req, res) => {
    if (req.session.AuthCookie === undefined) {
        res.render("login/notAuthorized", { isDisplayLogout: false });
    } else {
        try {
            res.render("contributions/form", {
                hasError: false, error: "", title: 'Title', isDisplayLogout: true,
                isReqSubmitted: false
            });
            const pendingContris = await contributionData.getAllPendingContributions();
            const contriArray = []
            pendingContris.forEach(c => {
                console.log(c._id + "  ?");
                contriArray.push(c);
            });
            //Below page is for showing all the pending requests
            //res.render("./contributions/pendingContri", { contributions: contriArray, title: "pending reqs" });
            // res.json(pendingContris);

        } catch (e) {
            res.status(500).json({ error: e + 'Internal Server occured!' });
        }
    }
});

var multer = require('multer');
var upload = multer({ dest: 'public/media/' });

router.post('/', upload.single('sl_media_path'), async (req, res) => {
    if (req.session.AuthCookie === undefined) {
        res.render("login/notAuthorized", { isDisplayLogout: false });
    } else {
        if (req.body.sl_type == "default") {
            res.render("contributions/form", {
                isReqSubmitted: false, hasError: true,
                error: "Please choose sign language type"
            });
        } else if (req.body.sl_text == "") {
            res.render("contributions/form", {
                isReqSubmitted: false, hasError: true,
                error: "You must proivde corresponding text for given sign symbol"
            });
        } else if (req.file.originalname == "") {
            res.render("contributions/form", {
                isReqSubmitted: false, hasError: true,
                error: "You must select file to be uploaded"
            });
        } else {
            console.log('logged in user id:', userInfoJson._id);
            const tempPath = req.file.path;
            const targetPath = path.join("./" + req.file.destination + req.file.originalname);
            console.log("media path:", targetPath);
            // if (path.extname(req.file.originalname).toLowerCase() === ".png") {
            var message = await contributionData.contributeSign(userInfoJson._id, req.body.sl_type, targetPath,
                req.body.sl_text);
            /** TODO : Remove this. This is temp hack to directly add signs to DB */
            // await contributionData.approveOrRejectContribution(userInfoJson._id, "beginner", true);

            fs.rename(tempPath, targetPath, err => {
                // if (err) return handleError(err, res);
                try {
                    res.render("contributions/form", { isReqSubmitted: true, hasError: false });
                } catch (e) {
                    res.render("contributions/form", { isReqSubmitted: false, hasError: true, status_code: 400, error: e });
                    // res.status(400).json({ error: e });
                }
            });
        }
    }

});

router.post('/pendingContributions', async (req, res) => {
    if (req.session.AuthCookie === undefined) {
        res.render("login/notAuthorized", { isDisplayLogout: false });
    } else {
        try {
            // approve or reject contribution in database
            const info = req.body;
            console.log(info);
            var isApproved = false;

            if (info.sl_status === "approve") { isApproved = true; }

            // remove record from contributions and add it to signs collection if approved
            var msg = await contributionData.approveOrRejectContribution(info.contribution_id, info.level, isApproved);

            // display all pending contributions
            // const pendingContris = await contributionData.getAllPendingContributions();    
            // const contriArray = []    
            // pendingContris.forEach(c => {
            //    console.log(c.media_path+"  ?"); 
            //    contriArray.push(c);
            // });
            // res.render("./contributions/pendingContri", { contributions: contriArray, title: "pending reqs" });
            // res.sendStatus(200).json({message:msg});
            res.end(JSON.stringify({ success: msg, status: 200 }));
            // res.json({success : msg, status : 200});

        } catch (e) {
            res.status(500).json({ error: e + 'Internal Server occured!' });
        }
    }

});

module.exports = router;
