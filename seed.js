const connection = require('./config/mongoConnection');
const users = require('./data/users');
const fs = require('fs');
const ObjectId = require('mongodb').ObjectID;

async function runSetup() {
    const db = await connection();

    try {
        // We can recover from this; if it can't drop the collection, it's because
        await db.collection('signs').drop();
        await db.collection('users').drop();
        await db.collection('progress').drop();
    } catch (e) {

    }

    const signsCollection = await db.collection('signs');
    const usersCollection = await db.collection('users');
    const progressCollection = await db.collection('progress');


    // Users ******************************
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

    // Signs **************************************
    // const folder = './public/media/';
    const asl_b = './public/media/ASL/beginner/';
    const asl_i = './public/media/ASL/intermediate/';
    const asl_a = './public/media/ASL/advanced/';

    const bsl_b = './public/media/BSL/beginner/';
    const bsl_i = './public/media/BSL/intermediate/';
    const bsl_a = './public/media/BSL/advanced/';

    var asl_bImgList = [];

    fs.readdirSync(asl_b).forEach(file => {
        //console.log(file);
        //TODO : dynamic path extraction
        //TODO : //http://localhost:3000/public/media/ASL/beginner/" + file,
        asl_bImgList.push({
            language_type: 'ASL',
            level: 'beginner',
            media_path: "../../public/media/ASL/beginner/" + file,
            text: (file.substring(0, file.length - 4)).toLowerCase(),
            contributor_id: user1Obj._id
        });

    });

    await signsCollection.insertMany(asl_bImgList);

    var asl_iImgList = [];

    fs.readdirSync(asl_i).forEach(file => {
        //console.log(file);
        //TODO : dynamic path extraction
        //TODO : //http://localhost:3000/public/media/ASL/beginner/" + file,
        asl_iImgList.push({
            language_type: 'ASL',
            level: 'intermediate',
            media_path: "../../public/media/ASL/intermediate/" + file,
            text: (file.substring(0, file.length - 4)).toLowerCase(),
            contributor_id: user1Obj._id
        });

    });

    await signsCollection.insertMany(asl_iImgList);    

    var asl_aImgList = [];

    fs.readdirSync(asl_a).forEach(file => {
        //console.log(file);
        //TODO : dynamic path extraction
        //TODO : //http://localhost:3000/public/media/ASL/beginner/" + file,
        asl_aImgList.push({
            language_type: 'ASL',
            level: 'advanced',
            media_path: "../../public/media/ASL/advanced/" + file,
            text: (file.substring(0, file.length - 4)).toLowerCase(),
            contributor_id: user1Obj._id
        });

    });

    await signsCollection.insertMany(asl_aImgList);

    var bsl_bImgList = [];
    fs.readdirSync(bsl_b).forEach(file => {
        //console.log(file);
        //TODO : dynamic path extraction
        //TODO : //http://localhost:3000/public/media/ASL/beginner/" + file,
        bsl_bImgList.push({
            language_type: 'BSL',
            level: 'beginner',
            media_path: "../../public/media/BSL/beginner/" + file,
            text: (file.substring(0, file.length - 4)).toLowerCase(),
            contributor_id: user1Obj._id
        });

    });

    await signsCollection.insertMany(bsl_bImgList);

    var bsl_iImgList = [];

    fs.readdirSync(bsl_i).forEach(file => {
        //console.log(file);
        //TODO : dynamic path extraction
        //TODO : //http://localhost:3000/public/media/ASL/beginner/" + file,
        bsl_iImgList.push({
            language_type: 'BSL',
            level: 'intermediate',
            media_path: "../../public/media/BSL/intermediate/" + file,
            text: (file.substring(0, file.length - 4)).toLowerCase(),
            contributor_id: user1Obj._id
        });

    });

    await signsCollection.insertMany(bsl_iImgList);

    var bsl_aImgList = [];

    fs.readdirSync(bsl_a).forEach(file => {
        //console.log(file);
        //TODO : dynamic path extraction
        //TODO : //http://localhost:3000/public/media/ASL/beginner/" + file,
        bsl_aImgList.push({
            language_type: 'BSL',
            level: 'advanced',
            media_path: "../../public/media/BSL/advanced/" + file,
            text: (file.substring(0, file.length - 4)).toLowerCase(),
            contributor_id: user1Obj._id
        });

    });
    //console.log("imglist" + imgList)

    await signsCollection.insertMany(bsl_aImgList);

    // Progress seed *******************************
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