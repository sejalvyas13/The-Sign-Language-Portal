const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const ObjectId = require('mongodb').ObjectID;


module.exports = {

    async create(firstname, lastname, username, hashedPwd) {

        // error checking
        if (!firstname) throw "You must provide your firstname";
        if (!lastname) throw "You must provide your lastname";
        if (!username) throw "You must provide your username";
        if (!hashedPwd) throw "You must provide your password";

        // get db connection to users collection
        const usersCollection = await users();

        // // add password hashing function
        // hashedPwd = getHashedPwd(password);

        let newUser = {
            firstname: firstname,
            lastname: lastname,
            username: username.toLowerCase(),
            hashedPwd: hashedPwd,
            userType: 'normal',
            profileViews: 0
        };

        // perform insert
        const insertInfo = await usersCollection.insertOne(newUser);
        if (insertInfo.insertedCount === 0) throw "Could not add user";

        return await this.get(insertInfo.insertedId.toString());
    },

    async getAll() {
        // return all the users
        const usersCollection = await users();
        return await usersCollection.find({}).toArray();
    },

    async get(username, hashedPwd) {
        // error checking
        if (!username) throw "You must provide your username";

        // // add password hashing function
        // hashedPwd = getHashedPwd(password);

        // get db connection to user collection
        const usersCollection = await users();

        // perform search
        const user = await usersCollection.findOne({ username: username.toLowerCase() });
        if (user === null) throw "No user with given username";
        else if (hashedPwd && user.hashedPwd != hashedPwd) throw "Password doesn't match";

        return user;
    },

    async remove(id) {
        // error checking
        if (!id) throw "You must provide an id";
        if (typeof (id) != 'string') throw "id should be a string";

        // get db connection to users collection
        const usersCollection = await users();
        // const animalBeingDeleted = await this.get(id);

        // perform delete
        const deletionInfo = await usersCollection.removeOne({ _id: ObjectId(id) });

        if (deletionInfo.deletedCount === 0) {
            throw `Could not delete user with id of ${id}`;
        }

        return "Deleted!";
    },

    async updateUser(id, updateProperties) {
        // error checking
        if (!id) throw "You must provide an id of user";
        if (typeof (id) != 'string') throw "id should be a string";

        const { firstname, lastname, hashedPwd } = updateProperties;

        // // add password hashing function
        // hashedPwd = getHashedPwd(password);

        // get db connection to users collection
        const usersCollection = await users();
        const t_user = await this.get(id);

        var updatedUser;

        if (firstname && lastname && hashedPwd) {

            updatedUser = {
                firstname: firstname,
                lastname: lastname,
                username: t_user.username,
                hashedPwd: hashedPwd,
                userType: t_user.userType,
                profileViews: t_user.profileViews
            };
        } else throw "Please provide firstname, lastname and password";

        // perform update
        const updateInfo = await usersCollection.updateOne({ _id: ObjectId(id) }, { $set: updatedUser });
        if (updateInfo.modifiedCount === 0) {
            throw "could not update user successfully";
        }

        return await this.get(id);
    },

    async updateProfileViews(id){
        // error checking
        if (!id) throw "You must provide an id";
        if (typeof (id) != 'string') throw "id should be a string";

        // get db connection to users collection
        const usersCollection = await users();
        const t_user = await this.get(id);
        const old_profileViews = t_user.profileViews;

        // increase profileviews by 1
        const updateInfo = await usersCollection.updateOne({ _id: ObjectId(id) }, { profileViews: old_profileViews+1 });

        if (updateInfo.modifiedCount === 0) {
            throw "could not update profileViews successfully";
        }

        return "proileViews Updated!";
    },

    async assignUserType(id, userType){
        // error checking
        if (!id) throw "You must provide an id";
        if(!userType) throw "You must provide user typw";

        if (typeof (id) != 'string') throw "id should be a string";
        if(typeof(userType)) throw "User type should be a string";

        // get db connection to users collection
        const usersCollection = await users();

        // update user type
        const updateInfo = await usersCollection.updateOne({ _id: ObjectId(id) }, { userType: userType });

        if (updateInfo.modifiedCount === 0) {
            throw "could not update user type successfully";
        }

        return "userType Updated!";
    }
};
