const express = require('express');
const router = express.Router();
const data = require('../data');
const usersData = data.users;
const contributionsData = data.contributions;
const progressData = data.progress;

// Json schema validator
// const djv = require('djv');
// const env = djv();

// const jsonSchema = {
//     "required": [
//         "name",
//         "animalType"
//     ]
// };

// // Add json-schema
// env.addSchema('postAnimal', jsonSchema);

// Sign up
router.get('/', async (req, res) => {
    try {
        res.render("users/profile",{});
    } catch (e) {
        res.status(500).json({ error: e });
    }

});
router.post('/new', async (req, res) => {
    const userData = req.body;

    try {
        const { firstname, lastname, username, hashedPwd } = userData;
        const output = await usersData.create(firstname, lastname, username, hashedPwd);
        res.json(output);
    } catch (e) {
        res.status(500).json({ error: e });
    }

});

// Login
router.post('/', async (req, res) => {
    const userCreds = req.body;

    try {
        const { username, hashedPwd } = userCreds;
        const user = await usersData.get(username, hashedPwd);
        const contributions = await contributionsData.getContributionsById(user._id);
        const progress = await progressData.getProgressById(user._id);

        const allData = {
            userInfo: user,
            contributionsInfo: contributions,
            progressInfo: progress
        }

        res.json(allData);
    } catch (e) {
        res.status(500).json({ error: e });
    }

});

// User profile update
// router.put('/:id', async (req, res) => {
//     const updatedData = req.body;
//     try {
//         await usersData.get(req.params.id);
//     } catch (e) {
//         res.status(404).json({ error: 'User not found' });
//     }

//     try {
//         const updatedUser = await usersData.updateUser(req.params.id, updatedData);
//         res.json(updatedUser);
//     } catch (e) {
//         res.status(500).json({ error: e });
//     }
// });

// // Delete user account
// router.delete('/:id', async (req, res) => {

//     var user;
//     try {
//         user = await usersData.get(req.params.id);
//     } catch (e) {
//         res.status(404).json({ error: 'User not found' });
//     }

//     try {

//         let likes = []
//         let posts = []

//         for (const likeId of animal.likes) {
//             const post = await postsData.getPostById(likeId);
//             likes.push({
//                 "_id": likeId,
//                 "title": post.title
//             });
//         }

//         for (const postId of animal.posts) {
//             const post = await postsData.getPostById(postId);
//             posts.push({
//                 "_id": postId,
//                 "title": post.title
//             });
//         }

//         output = {
//             "deleted": true,
//             "data": {
//                 "_id": animal._id,
//                 "name": animal.name,
//                 "animalType": animal.animalType,
//                 "likes": likes,
//                 "posts": posts
//             }
//         }

//         await usersData.remove(req.params.id);
//         await postsData.removeAllPosts(req.params.id);

//         res.json(output);
//     } catch (e) {
//         res.status(500).json({ error: e });
//     }
// });


module.exports = router;
