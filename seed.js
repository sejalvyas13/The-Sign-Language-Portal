const connection = require('./config/mongoConnection');
const users = require('./data/users');
const fs = require('fs');


async function runSetup() {
    const db = await connection();

    try {
        // We can recover from this; if it can't drop the collection, it's because
        await db.collection('signs').drop();
        await db.collection('users').drop();
    } catch (e) {
        
    }

    const signsCollection = await db.collection('signs');
    const usersCollection = await db.collection('users');


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
    const userObj = await users.get(user1.username, user1.hashedPwd);

    const folder = './public/media/';
    var imgList = []

    fs.readdirSync(folder).forEach(file => {
            console.log(file);
            imgList.push({
                language_type: 'ASL',
                level: 'beginner',
                media_path: "http://localhost:3000/public/media/" + file,
                text: file.substring(0,file.length-4),
                contributor_id: userObj._id
            });

    });
        console.log("imglist" + imgList)

    await signsCollection.insertMany(imgList);

}

// By exporting a function, we can run
exports = module.exports = { runSetup };