const mongoCollections = require("../config/mongoCollections");
const progress = mongoCollections.progress;
const ObjectId = require('mongodb').ObjectID;

module.exports = {
    async getProgressById(id) {
        if (!id) throw "You must provide an id to search for post";
        if (typeof (id) != 'string') throw "id should be a string";

        const progressCollection = await progress();
        const userProgress = await progressCollection.findOne({ _id: ObjectId(id) });
        if (userProgress === null) throw "No progress record with given id";

        return userProgress;
    },
    async getProgressByUserId(user_id) {
        if (!user_id) throw "You must provide user id to search for post";
        if (typeof (user_id) != 'string') throw "user id should be a string";

        const progressCollection = await progress();
        const userProgress = await progressCollection.findOne({ user_id: ObjectId(user_id) });
        if (userProgress === null) throw "No progress record with given user id";

        return userProgress;
    },
    async addProgress(user_id) {
        if (!user_id) throw "You must provide user id";

        const progressCollection = await progress();

        const newProgressInfo = {
            user_id: ObjectId(user_id),
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

        const insertInfo = await progressCollection.insertOne(newProgressInfo);
        if (insertInfo.insertedCount === 0) throw "Could not add progress";   

        return "Progress Added!";
    },
    async removeProgress(user_id) {
        if (!user_id) throw "You must provide user id to delete progress record";

        const progressCollection = await progress();
        const deletionInfo = await progressCollection.removeOne({ _id: ObjectId(user_id) });

        if (deletionInfo.deletedCount === 0) {
            throw `Could not delete progress with id of ${user_id}`;
        }
    },

async updateQuizScoresProgress(user_id, scores) {
        if (!user_id) throw "You must provide user id to update progress record";

        // const { scores, learning_progress, learned_sl, badges } = updateProperties;

        const progressCollection = await progress();
        console.log("updated scores inside", scores);
        // let updatedProgress;

        if (scores) {            

            // updatedProgress = {
            //     user_id: ObjectId(user_id),
            //     scores: scores,
            //     learning_progress: learning_progress,
            //     learned_sl: learned_sl,
            //     badges: badges
            // };
            const updatedInfo = await progressCollection.update(  
                { user_id: ObjectId(user_id) }, 
                { $set: { scores: scores  } } 
            );

            if (updatedInfo.modifiedCount === 0) {
                throw "could not update progress record successfully";
            }
        } else throw "some of the progress fields are missing";     

        return "Scores updated!";
    },

    async updateLearningScoresProgress(user_id, scores) {
        if (!user_id) throw "You must provide user id to update progress record";

        // const { scores, learning_progress, learned_sl, badges } = updateProperties;

        const progressCollection = await progress();
        console.log("updated scores inside", scores);

        // let updatedProgress;

        if (scores) {            

            // updatedProgress = {
            //     user_id: ObjectId(user_id),
            //     scores: scores,
            //     learning_progress: learning_progress,
            //     learned_sl: learned_sl,
            //     badges: badges
            // };
            const updatedInfo = await progressCollection.update(  
                { user_id: ObjectId(user_id) }, 
                { $set: { learning_progress: scores  } } 
            );

            if (updatedInfo.modifiedCount === 0) {
                throw "could not update progress record successfully";
            }
        } else throw "some of the progress fields are missing";     

        return "Scores updated!";
    },

    async updateProgress(user_id, updateProperties) {
        if (!user_id) throw "You must provide user id to update progress record";

        const { scores, learning_progress, learned_sl, badges } = updateProperties;

        const progressCollection = await progress();

        let updatedProgress;

        if (scores && learning_progress && learned_sl && badges) {            

            updatedProgress = {
                user_id: ObjectId(user_id),
                scores: scores,
                learning_progress: learning_progress,
                learned_sl: learned_sl,
                badges: badges
            };
        } else throw "some of the progress fields are missing";

        const updatedInfo = await progressCollection.replaceOne(
            { _id: ObjectId(id) },
            updatedProgress
        );

        if (updatedInfo.modifiedCount === 0) {
            throw "could not update progress record successfully";
        }

        return "Progress record updated!";
    }
};