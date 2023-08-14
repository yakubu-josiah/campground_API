var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    name: String,
    comment: String
});

module.exports = mongoose.model("Comment", commentSchema);


