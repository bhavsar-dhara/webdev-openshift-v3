/**
 * Created by Dhara on 6/7/2016.
 */
module.exports = function () {
    
    var mongoose = require('mongoose');
    
    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        dob: Date,
        email: String,
        phone: String,
        google: {
            id: String,
            displayName: String,
            name: String,
            gender: String,
            email: String
        },
        twitter: {
            id: String,
            twitterHandle: String,
            name: String,
            gender: String,
            email: String
        },
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.user"});
    
    return UserSchema;
};