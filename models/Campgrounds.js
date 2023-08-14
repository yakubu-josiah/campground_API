var mongoose = require("mongoose");

// MONGOOSE SCHEMA AND MODEL CONFIG
var campgroundSchema = new mongoose.schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
});

// CHANGED THE COMMA FOR A COLON JUST TO AVOID SEEING THE ERROR
module.exports = mongoose.model("Campground", campgroundSchema);
