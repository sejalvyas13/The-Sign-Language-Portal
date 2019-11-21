const express = require('express');
const router = express.Router();
const data = require('../data');
const animalsData = data.animals;
const postsData = data.posts;

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

// router.get('/', async (req, res) => {
//     try {
//         const postsList = await postsData.getAllPosts();
//         const modifiedPostsList = [];
//         // console.log("before loop");
//         for (const post of postsList) {
//             const animal = await animalsData.get(post.author);
//             author = {
//                 _id: post.author,
//                 name: animal.name
//             };

//             modifiedPostsList.push({
//                 _id: post._id,
//                 title: post.title,
//                 content: post.content,
//                 author: author
//             })
//         }
//         // console.log("after loop");

//         res.json(modifiedPostsList);
//     } catch (e) {
//         res.status(500).json({ error: e });
//     }
// });

// router.post('/', async (req, res) => {
//     const input = req.body;

//     if (env.validate('post', input) !== undefined)
//         res.status(400).json({ error: "Input doesn't match schema!" });
//     else {

//         try {
//             const { title, author, content } = input;
//             const newPost = await postsData.addPost(title, author, content);
//             const animal = await animalsData.get(author);
//             res.json({
//                 _id: newPost._id,
//                 title: newPost.title,
//                 content: newPost.content,
//                 author: {
//                     _id: newPost.author,
//                     name: animal.name
//                 }
//             });
//         } catch (e) {
//             res.status(500).json({ error: e });
//         }
//     }
// });

// router.get('/:id', async (req, res) => {
//     try {
//         const post = await postsData.getPostById(req.params.id);
//         const animal = await animalsData.get(post.author);
//         res.json({
//             _id: post._id,
//             title: post.title,
//             content: post.content,
//             author: {
//                 _id: post.author,
//                 name: animal.name
//             }
//         });

//     } catch (e) {
//         res.status(404).json({ error: 'Post not found' });
//     }
// });

// router.put('/:id', async (req, res) => {
//     const updatedData = req.body;

//     if (updatedData.newTitle || updatedData.newContent) {

//         try {
//             await postsData.getPostById(req.params.id);
//         } catch (e) {
//             res.status(404).json({ error: 'Post not found' });
//         }

//         try {
//             const updatedPost = await postsData.updatePost(req.params.id, updatedData);
//             const animal = await animalsData.get(updatedPost.author);
//             res.json({
//                 _id: updatedPost._id,
//                 title: updatedPost.title,
//                 content: updatedPost.content,
//                 author: {
//                     _id: updatedPost.author,
//                     name: animal.name
//                 }
//             });
//         } catch (e) {
//             res.status(500).json({ error: e });
//         }

//     } else {
//         res.status(400).json({ error: "Please provide atleast one property" });
//     }

// });

// router.delete('/:id', async (req, res) => {

//     var post;
//     try {
//         post = await postsData.getPostById(req.params.id);
//     } catch (e) {
//         res.status(404).json({ error: 'Post not found' });
//     }
//     try {
//         const animal = await animalsData.get(post.author);
//         output = {
//             deleted: true,
//             data: {
//                 _id: post._id,
//                 title: post.title,
//                 content: post.content,
//                 author: {
//                     _id: post.author,
//                     name: animal.name
//                 }
//             }
//         }

//         await postsData.removePost(req.params.id, post.author);
//         res.json(output);
//     } catch (e) {
//         res.status(500).json({ error: e });
//     }
// });

module.exports = router;
