const connection = require('./config/mongoConnection');
const users = require('./data/users');
const fs = require('fs');
const ObjectId = require('mongodb').ObjectID;

async function runSetup() {
    const db = await connection();

    try {
        // We can recover from this; if it can't drop the collection, it's because
        await db.collection('signs').drop();
        // await db.collection('users').drop();
        await db.collection('progress').drop();
    } catch (e) {
        
    }

    const signsCollection = await db.collection('signs');
    const usersCollection = await db.collection('users');
    const progressCollection = await db.collection('progress');


    let user1 = {
        firstname: "Sejal",
        lastname: "Vyas",
        username: "sejalvyas",
        hashedPwd: "hashedPwd",
        userType: 'admin',
        profileViews: 0
    };

    let user4 = {
        firstname: "Vivek",
        lastname: "Solanki",
        username: "viveksolanki",
        hashedPwd: "hashedPwd",
        userType: 'admin',
        profileViews: 0
    };

    let user2 = {
        firstname: "Kevin",
        lastname: "John",
        username: "kevinjohn",
        hashedPwd: "hashedPwd",
        userType: 'admin',
        profileViews: 0
    };

    let user3 = {
        firstname: "Ronald",
        lastname: "Fernandes",
        username: "ronald",
        hashedPwd: "hashedPwd",
        userType: 'admin',
        profileViews: 0
    };

    const usersList = [];

    usersList.push(user1, user2, user3, user4);


    await usersCollection.insertMany(usersList);
    const user1Obj = await users.get(user1.username, user1.hashedPwd);

    const folder = './public/media/';
    var imgList = []

    fs.readdirSync(folder).forEach(file => {
            //console.log(file);
            //TODO : dynamic path extraction
            //TODO : 
            imgList.push({
                language_type: 'ASL',
                level: 'beginner',
                media_path: "http://localhost:3000/public/media/" + file,
                text: (file.substring(0,file.length-4)).toLowerCase(),
                contributor_id: user1Obj._id
            });

    });
    //console.log("imglist" + imgList)

    await signsCollection.insertMany(imgList);

    // Progress seed
    const user2Obj = await users.get(user2.username, user2.hashedPwd);
    const user3Obj = await users.get(user3.username, user3.hashedPwd);
    const user4Obj = await users.get(user4.username, user4.hashedPwd);

    const user1_progress = {
        user_id: ObjectId(user1Obj._id),
        scores: {
            beginner: 0,
            intermediate: 0,
            advanced: 0,
        },
        learning_progress: {
            beginner: 0,
            intermediate: 0,
            advanced: 0
        },
        learned_sl: [],
        badges: {
            test_badge: undefined,
            contribution_badge: undefined
        }
    };

    const user2_progress = {
        user_id: ObjectId(user2Obj._id),
        scores: {
            beginner: 0,
            intermediate: 0,
            advanced: 0,
        },
        learning_progress: {
            beginner: 0,
            intermediate: 0,
            advanced: 0
        },
        learned_sl: [],
        badges: {
            test_badge: undefined,
            contribution_badge: undefined
        }
    };

    const user3_progress = {
        user_id: ObjectId(user3Obj._id),
        scores: {
            beginner: 0,
            intermediate: 0,
            advanced: 0,
        },
        learning_progress: {
            beginner: 0,
            intermediate: 0,
            advanced: 0
        },
        learned_sl: [],
        badges: {
            test_badge: undefined,
            contribution_badge: undefined
        }
    };

    const user4_progress = {
        user_id: ObjectId(user4Obj._id),
        scores: {
            beginner: 0,
            intermediate: 0,
            advanced: 0,
        },
        learning_progress: {
            beginner: 0,
            intermediate: 0,
            advanced: 0
        },
        learned_sl: [],
        badges: {
            test_badge: undefined,
            contribution_badge: undefined
        }
    };

    const progressList = [];

    progressList.push(user1_progress, user2_progress, user3_progress, user4_progress);

    await progressCollection.insertMany(progressList);

}

// By exporting a function, we can run
exports = module.exports = { runSetup };