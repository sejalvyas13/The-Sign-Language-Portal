const mongoCollections = require("../config/mongoCollections");
const signs = mongoCollections.signs;
const ObjectId = require('mongodb').ObjectID;

module.exports = {
    async getSignById(id) {
        if (!id) throw "You must provide an id to search for sign";
        if (typeof(id) != 'string') throw "id should be a string";

        const signCollection = await signs();
        const sign = await signCollection.findOne({ _id: ObjectId(id) });
        if (sign === null) throw "No sign with that id";

        return sign;
    },
    async getSignByText(text) {
        if (!text) throw "You must provide text to search for sign";
        if (typeof(text) != 'string') throw "text should be a string";

        const signCollection = await signs();
        const sign = await signCollection.findOne({ text: text.toLowerCase() });
        if (sign === null) throw "No sign with that id";

        return sign;
    },
    async getAllBeginnerSigns() {
        const signCollection = await signs();
        console.log("In getAllBeginnerSigns");
        const allBeginnerSigns = await signCollection.find({level:"beginner"}).toArray();

        return allBeginnerSigns;
    },
    async getAllIntermediateSigns() {
        const signCollection = await signs();

        const allIntermediateSigns = await signCollection.find({level:"intermediate"}).toArray();

        return allIntermediateSigns;
    },
    async getAllAdvancedSigns() {
        const signCollection = await signs();

        const allAdvancedSigns = await signCollection.find({level:"advanced"}).toArray();

        return allAdvancedSigns;
    },
    async addSign(signObj) {
        if (!signObj) throw "sign object doesn't exists";

        const signCollection = await signs();

        const newSign = {
            language_type: signObj.language_type,
            level: signObj.level,
            media_path: signObj.media_path,
            text: signObj.text.toLowerCase(),
            contributor_id: signObj.contributor_id
        };

        const insertInfo = await signCollection.insertOne(newSign);
        if (insertInfo.insertedCount === 0) throw "Could not add sign";

        // remove sign from contributions collection
        /** TODO: Add this function wherever addSign is called */
        //await contributions.remove(signObj.contributor_id);

        return "Sign Added!";
    },
    async removeSign(signId) {
        if (!signId) throw "You must provide a sign id to remove a sign";

        const signCollection = await signs();
        const signTobeDeleted = await this.getSignById(signId);
        const deletionInfo = await signCollection.removeOne({ _id: ObjectId(signId) });        

        if (deletionInfo.deletedCount === 0) {
            throw `Could not delete sign with id of ${signId}`;
        }

        // update signs into corresponding contributions collection
        /** TODO: Add this function wherever addSign is called */
        //await contributions.updateContribution(signTobeDeleted.contributor_id, signId);
    }
};