/**
 * Created by Dhara on 6/7/2016.
 */
module.exports = function () {
    
    var mongoose = require('mongoose');
    var ProjectUserSchema = require('./user.schema.server.js')();
    var ProjectUser = mongoose.model('ProjectUser', ProjectUserSchema);
    
    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByGoogleId: findUserByGoogleId,
        findUserByTwitterId: findUserByTwitterId,
        findAllUsers: findAllUsers,
        addInvite: addInvite,
        updateUserByAdmin: updateUserByAdmin
    };
    return api;

    function updateUserByAdmin(userId, user) {
        return ProjectUser
            .update({_id: userId}, {
                $set: {
                    username: user.username,
                    password: user.password,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    roles: user.roles
                }
            });
    }

    function addInvite(userId, invite) {
        delete invite.inviteeId;
        // console.log(JSON.stringify(invite));
        return ProjectUser
            .update({_id: userId}, {
                $push: {
                    invites: invite
                }
            });
    }
    
    function findAllUsers() {
        return ProjectUser.find({});
    }

    function findUserByTwitterId(twitterId) {
        return ProjectUser.findOne({"twitter.id": twitterId});
    }
        
    function findUserByGoogleId(googleId) {
        return ProjectUser.findOne({"google.id": googleId});
    }

    // Creates a new user instance
    function createUser(user) {
        // console.log("in model create.." + JSON.stringify(user));
        return ProjectUser.create(user);
    }

    // Retrieves a user instance whose _id is equal to parameter userId
    function findUserById(userId) {
        return ProjectUser.findById({_id: userId});
    }

    // Retrieves a user instance whose username and password are equal to parameters userId and password
    function findUserByCredentials(username, password) {
        return ProjectUser.findOne({
            username: username,
            password: password
        });
    }

    // Retrieves a user instance whose username is equal to parameter username
    function findUserByUsername(username) {
        return ProjectUser.findOne({username: username});
    }

    // Updates user instance whose _id is equal to parameter userId
    function updateUser(userId, user) {
        return ProjectUser
            .update({_id: userId}, {
                $set: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone
                }
            });
    }

    // Removes user instance whose _id is equal to parameter userId
    function deleteUser(userId) {
        return ProjectUser.remove({_id: userId});
    }
};