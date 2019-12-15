const connection = require('./config/mongoConnection');
const users = require('./data/users');
const fs = require('fs');
const ObjectId = require('mongodb').ObjectID;

async function runSetup() {
    const db = await connection();

    try {
        // We can recover from this; if it can't drop the collection, it's because
        await db.collection('signs').drop();
    } catch (e) {

    }

    const signsCollection = await db.collection('signs');


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
            contributor_id: "5df59230484a125ee84570e5"
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
            contributor_id: "5df59230484a125ee84570e5"
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
            contributor_id: "5df59230484a125ee84570e5"
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
            contributor_id: "5df59230484a125ee84570e5"
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
            contributor_id: "5df59230484a125ee84570e5"
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
            contributor_id: "5df59230484a125ee84570e5"
        });

    });
    //console.log("imglist" + imgList)

    await signsCollection.insertMany(bsl_aImgList);    

}

// By exporting a function, we can run
exports = module.exports = { runSetup };