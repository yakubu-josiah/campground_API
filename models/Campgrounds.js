var mongoose = require("mongoose");

// MONGOOSE SCHEMA AND MODEL CONFIG
var campgroundSchema = new mongoose.schema({
    name: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
});

module.exports = mongoose.model("Campground", campgroundSchema);
