const express = require("express");
const route = express.Router({ mergeParams: true });
const Campgrounds = require('../models/Campgrounds');
const Comments = require('../models/Comments');


route.get("/new", isLoggedIn, function (req, res) {
    var id = req.params.id;
    Campgrounds.findById(id, function (err, campground) {
        if (err) {
            console.log("Error couldn't find campground!!");
            console.log(err);
        } else {
            console.log("New comment page found!");
            res.render("comments/new", { campground: campground });
        }
    });
});

route.post("/", isLoggedIn, function (req, res) {
    var id = req.params.id;
    var formData = req.body.comment;
    Campgrounds.findById(id, function (err, campground) {
        if (err) {
            console.log("Error...couldn't add comment.");
            console.log(err);
        } else {
            Comments.create(formData, function (err, newComment) {
                console.log("Comments added!!!");
                campground.comments.push(newComment);
                campground.save();
                res.redirect("/yelpcamp/campground/" + id);
            });
        }
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated) {
        return next();
    }
    res.redirect("/login")
}

module.exports = route;