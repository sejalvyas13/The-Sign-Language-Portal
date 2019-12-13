const express = require('express');
const router = express.Router();
const data = require('../data');
const progressData = data.progress;

// Json schema validator
// const djv = require('djv');
// const env = djv();

// const jsonSchema = {
//     "required": [
//         "title",
//         "author",
//         "content"
//     ]
// };

// // Add json-schema
// env.addSchema('post', jsonSchema);

router.post('/', async (req, res) => {
    console.log("body", req.body);
    // var quiz_type = req.body.quiz_type;
    // var quiz_type = 'beginner';
    const progress = await progressData.getProgressByUserId(req.body.user_id);
    var scores = {"beginner":progress.scores.beginner, "intermediate":progress.scores.intermediate, 
                    "advanced":progress.scores.advanced};

    scores[req.body.quiz_type] = req.body[req.body.quiz_type];
    console.log("scores inside route", scores);
    console.log("user id inside route", req.body.user_id);
    const msg = await progressData.updateQuizScoresProgress(req.body.user_id, scores);
    try {
        res.send(JSON.stringify({message:msg}));
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.post('/learningProgress', async (req, res) => {
    console.log("body", req.body);
    // var quiz_type = req.body.quiz_type;
    // var quiz_type = 'beginner';
    const progress = await progressData.getProgressByUserId(req.body.user_id);
    console.log("Progress below")
    console.log(progress);
    var scores = {"beginner":progress.learning_progress.beginner, "intermediate":progress.learning_progress.intermediate, 
                    "advanced":progress.learning_progress.advanced};

    scores[req.body.level] = req.body.learningScore;
    console.log("scores inside route", scores);
    console.log("user id inside route", req.body.user_id);
    const msg = await progressData.updateLearningScoresProgress(req.body.user_id, scores, req.body.sign_id);
    try {
        res.send(JSON.stringify({message:msg}));
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

module.exports = router;
