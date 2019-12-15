const express = require('express');
const router = express.Router();
const data = require('../data');
const progressData = data.progress;
const usersData = data.users;

router.post('/', async (req, res) => {
    if (req.session.AuthCookie === undefined) {
        res.render("login/notAuthorized", { isDisplayLogout: false });
    } else {
        console.log("body", req.body);
        const progress = await progressData.getProgressByUserId(req.body.user_id);
        var scores = {
            "beginner": progress.scores.beginner, "intermediate": progress.scores.intermediate,
            "advanced": progress.scores.advanced
        };

        scores[req.body.quiz_type] = req.body[req.body.quiz_type];
        console.log("scores inside route", scores);
        console.log("user id inside route", req.body.user_id);
        const msg = await progressData.updateQuizScoresProgress(req.body.user_id, scores);
        try {
            res.send(JSON.stringify({ message: msg }));
            // res.render('quiz/quizCompleted', {'trueCount': req.body[req.body.quiz_type], 'totalQue':req.body.totalQue});
        } catch (e) {
            res.status(500).json({ error: e });
        }
    }
});

router.post('/learningProgress', async (req, res) => {
    if (req.session.AuthCookie === undefined) {
        res.render("login/notAuthorized", { isDisplayLogout: false });
    } else {
        console.log("body", req.body);
        // var quiz_type = req.body.quiz_type;
        // var quiz_type = 'beginner';
        var userdetails = await usersData.getUserByUsername(req.session.AuthCookie);
        const progress = await progressData.getProgressByUserId(userdetails._id.toString());
        console.log("Progress below")
        console.log(progress);
        var scores = {
            "beginner": progress.learning_progress.beginner, "intermediate": progress.learning_progress.intermediate,
            "advanced": progress.learning_progress.advanced
        };

        scores[req.body.level] = req.body.learningScore;
        console.log("scores inside route", scores);
        const msg = await progressData.updateLearningScoresProgress(userdetails._id, scores, req.body.sign_id);
        try {
            res.send(JSON.stringify({ message: msg }));
        } catch (e) {
            res.status(500).json({ error: e });
        }
    }
});

module.exports = router;
