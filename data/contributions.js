const mongoCollections = require("../config/mongoCollections");
const contributions = mongoCollections.contributions;
const signs = require("./signs");
const ObjectId = require('mongodb').ObjectID;

module.exports = {
    async getContributionsByContributorId(id) {
        if (!id) throw "You must provide an id";

        const contributionCollection = await contributions();
        const contribution = await contributionCollection.findOne({ _id: ObjectId(id) });
        if (contribution === null) throw "No contribution with given id";

        var signsArray = []
        for (const signId of contribution.contributions) {
            const sign = await signs.getSignById(signId);
            signsArray.push(sign);
        }

        return signsArray;
    },
    async getContributionsByContributionId(id) {
        if (!id) throw "You must provide an id";

        const contributionCollection = await contributions();
        const contribution = await contributionCollection.findOne({ _id: ObjectId(id) });
        if (contribution === null) throw "No contribution with given id";

        // var signsArray = []
        // for (const signId of contribution.contributions) {
        //     const sign = await signs.getSignById(signId);
        //     signsArray.push(sign);
        // }

        return contribution;
    },
    async getAllPendingContributions() {

        const contributionCollection = await contributions();
        const pendingContributions = await contributionCollection.find({ approval_status: "pending" });
        if (pendingContributions === null) throw "No contributions are pending";    

        return pendingContributions;
    },
    async contributeSign(contributor_id, language_type, media_path, text) {
        if (!contributor_id) throw "You must provide id of contributor";
        if (!language_type) throw "You must provide type of sign language";
        if (!media_path) throw "You must provide path for stored media";
        if (!text) throw "You must provide corresponsing text";

        const contributionCollection = await contributions();

        const newSign = {
            contributor_id: ObjectId(contributor_id),
            language_type: language_type,
            level: undefined,
            media_path: media_path,
            text: text,
            contributions: [],
            approval_status: "pending"                
        };

        const insertInfo = await contributionCollection.insertOne(newSign);
        if (insertInfo.insertedCount === 0) throw "Could not add sign";

        return "Sign Added!";
    },
    async remove(contribution_id) {
        if (!contribution_id) throw "You must provide contributor id to remove a contribution";

        const contributionCollection = await contributions();
        const deletionInfo = await contributionCollection.removeOne({ contribution_id: ObjectId(contribution_id) });

        if (deletionInfo.deletedCount === 0) {
            throw `Could not delete contribution with id of ${contribution_id}`;
        }
    },
    async approveOrRejectContribution(contribution_id, level, isApproved) {
        if (!contribution_id) throw "You must provide contribution id to remove a contribution";

        // const contributionCollection = await contributions();
        const contribution = await this.getContributionsByContributionId();
        await this.remove(contribution_id);

        if(isApproved){
            const updatedSign = {
                language_type: contribution.language_type,
                level: level,
                media_path:  contribution.media_path,
                text:  contribution.text,
                contributor_id: contribution.contributor_id
            };
            const message = await signs.addSign(updatedSign);
        }
        else{
            // do something
        }
    }
};