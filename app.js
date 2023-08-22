const express = require("express"),
    PORT = 3000,
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    bodySanitizer = require("express-sanitizer"),
    passportLocalMongoose = require("passport-local-mongoose");

const Comments = require("./models/Comments");
const Campgrounds = require("./models/Campgrounds");
const Users = require("./models/Users");

// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "My secret word is being stored here",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Users.authenticate()));
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());


var app = express(),
    seedDB = require("./seeds")

// APP CONFIG
mongoose.connect("mongodb://localhost/yelp-camp");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodySanitizer());
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
seedDB();

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

//=================================//
//      CAMPGROUNDS ROUTES         //
//=================================//

app.get("/yelpcamp/campground", function (req, res) {
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

app.get("/yelpcamp/campground/addnew", function (req, res) {
    res.render("campground/new");
});

app.post("/yelpcamp/campground", function (req, res) {
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

app.get("/yelpcamp/campground/:id", function (req, res) {
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

app.get("/yelpcamp/campground/:id/edit", function (req, res) {
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

app.put("/yelpcamp/campground/:id", function (req, res) {
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

app.delete("/yelpcamp/campground/:id", function (req, res) {
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


//=================================//
//      COMMENTS ROUTES            //
//=================================//

app.get("/yelpcamp/campground/:id/comment/new", isLoggedIn, function (req, res) {
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

app.post("/yelpcamp/campground/:id/comment", isLoggedIn, function (req, res) {
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

//=================================//
//          AUTH ROUTES            //
//=================================//

app.get("/register", function (req, res) {
    res.render("register");
});

app.post("/register", function (req, res) {
    var newUser = new Users({
        name: req.body.username,
        email: req.body.email
    });
    Users.register(new Users(newUser), req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("/register");
        }
        passport.authenticate("local"), (req, res, function () {
            res.redirect("/yelcamp");
        });
    });
});

app.get("/login", function (req, res) {
    res.render("login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/yelpcamp",
    failureRedirect: "/login"
}), function (req, res) {

});

app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/yelpcamp");
});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated) {
        return next();
    }
    res.redirect("/login")
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});