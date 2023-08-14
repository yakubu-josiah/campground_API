var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

UserSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String,
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);