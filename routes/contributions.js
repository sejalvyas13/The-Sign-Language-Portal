const express = require('express');
const path = require("path");
const fs = require("fs");
const router = express.Router();
const data = require('../data');
const contributionData = data.contributions;

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

var multer = require('multer')
var upload = multer({ dest: 'public/media/' })

router.post('/', upload.single('sl_media_path'), async (req, res) => {
    // info = req.body;
    // console.log(info);
    // console.log(req.file)

    const tempPath = req.file.path;
    const targetPath = path.join("./" + req.file.destination + req.file.originalname);
    console.log(targetPath);
    // if (path.extname(req.file.originalname).toLowerCase() === ".png") {
    fs.rename(tempPath, targetPath, err => {
        // if (err) return handleError(err, res);
        try {
            var message = contributionData.contributeSign("5db104cb47e3ea385c1172f1", req.body.sl_type, targetPath, 
                                                            req.body.sl_text);
            res.render("temp/view_image", { sl_media_path: targetPath, title: "Title" });
        } catch (e) {
            res.status(400).json({ error: e });
        }
        
        // res.status(200).contentType("text/plain").end("File uploaded!");
    });
    // res.render("temp/view_image", { sl_media_path: targetPath, title: "People Found" });
    // } else {
    //   fs.unlink(tempPath, err => {
    //     if (err) return handleError(err, res);

    //     res
    //       .status(403)
    //       .contentType("text/plain")
    //       .end("Only .png files are allowed!");
    //   });
    // }


    // if (!personName) {
    //     res.status(400);
    //     res.render("views/form", {
    //         hasError: true, error: "Please provide person name to search for!", title: "Person Finder"
    //     });
    // } else {
    //     var peopleList = [];
    //     try {
    //         peopleList = await searchData.getAllMatchedPeople(personName);
    //     } catch (e) {
    //         res.status(400).json({ error: e });
    //     }
    //     // console.log(peopleList);
    //     if (peopleList.length != 0)
    //         res.render("search/searchresults", { personName: personName, people: peopleList, title: "People Found" });
    //     else
    //         res.render("search/notfound", { personName: personName, title: "People Not Found" });
    // }
});

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
