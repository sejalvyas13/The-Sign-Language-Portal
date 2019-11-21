const mongoCollections = require("../config/mongoCollections");
const progress = mongoCollections.progress;
// const animals = require("./animals");
const ObjectId = require('mongodb').ObjectID;

module.exports = {
    async getProgressById(id) {
        if (!id) throw "You must provide an id to search for post";
        if (typeof (id) != 'string') throw "id should be a string";

        const progressCollection = await progress();
        const progress = await progressCollection.findOne({ _id: ObjectId(id) });
        if (progress === null) throw "No progress record with given id";

        return progress;
    },
    async addProgress(user_id) {
        if (!user_id) throw "You must provide user id";

        const progressCollection = await progress();

        const newProgressInfo = {
            user_id: ObjectId(user_id),
            scores: {
                beginner1: 0,
                beginner2: 0,
                beginner3: 0,
                intermediate1: 0,
                intermediate2: 0,
                advanced: 0,
                pro: 0,
            },
            learning_progress: {
                beginner1: 0,
                beginner2: 0,
                beginner3: 0,
                intermediate1: 0,
                intermediate2: 0,
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
    async updateProgress(user_id, updateProperties) {
        if (!user_id) throw "You must provide user id to delete progress record";

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