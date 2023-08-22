const express = require("express");
const route = express.Router();
const Campgrounds = require("../models/Campgrounds");

route.get("/", function (req, res) {
    Campgrounds.find({}, function (err, allCamps) {
        if (err) {
            console.log("Oops!! Campgrounds not found...");
            console.log(err);
        } else {
            console.log("All campgrounds found!!!");
            res.render("campground/index", { campground: allCamps });
        }
    });
});

route.get("/addnew", function (req, res) {
    res.render("campground/new");
});

route.post("/", function (req, res) {
    var newCampground = req.sanitizer(req.body.camp);

    Campgrounds.create({ newCampground }, function (err, newCamp) {
        if (err) {
            console.log("Couldn't save, something went wrong!");
            console.log(err);
        } else {
            console.log("Successfully created....");
            console.log(newCamp);
            res.redirect("/yelpcamp/campground");
        }
    });
});

route.get("/:id", function (req, res) {
    var id = req.params.id;
    Campgrounds.findById(id).populate("comment").exec(function (err, targetCamp) {
        if (err) {
            console.log("Oops! Couldn't find camp");
            console.log(err);
        } else {
            console.log("Campground found!!");
            console.log(targetCamp);
            res.render("campground/show", { campground: targetCamp });
        }
    });
});

route.get("/:id/edit", function (req, res) {
    var id = req.params.id;
    Campgrounds.findById(id, function (err, editCamp) {
        if (err) {
            console.log("Error finding camp");
            console.log(err);
        } else {
            console.log("Success!! Edit camp now...");
            res.render("campground/edit", { campground: editCamp });
        }
    });
});

route.put("/:id", function (req, res) {
    var id = req.params.id;
    var editedCamp = req.sanitizer(req.body.camp);

    Campgrounds.findByIdAndUpdate(id, editedCamp, function (err, camp) {
        if (err) {
            console.log("Error..couldn't update Camp!!");
            console.log(err);
        } else {
            console.log("Camp successfully updated!!");
            res.redirect("/yelpcamp/campground/" + id);
        }
    });
});

route.delete("/:id", function (req, res) {
    var id = req.params.id;
    var deleteCamp = Campgrounds.findByIdAndRemove(id);

    Campgrounds.remove({ deleteCamp }, function (err) {
        if (err) {
            console.log("Error deleting camp");
            console.log(err);
            res.redirect("/yelpcamp/campground/" + id);
        } else {
            console.log("Deleted successfully!!");
            res.redirect("/yelpcamp/campground");
        }
    });
});


module.exports = route;