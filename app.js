const express = require("express"),
    PORT = 3000,
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    bodySanitizer = require("express-sanitizer"),
    passportLocalMongoose = require("passport-local-mongoose");

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

// REQUIRING ROUTES
const IndexRoutes = require("./routes/index"),
    CampgroundRoutes = require("./routes/campgrounds"),
    CommentRoutes = require("./routes/comments");

var app = express(),
    seedDB = require("./seeds")

// APP CONFIG
mongoose.connect("mongodb://localhost/yelp-camp");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodySanitizer());
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
seedDB(); // seeding database here

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.use("/yelpcamp/", IndexRoutes);
app.use("/yelpcamp/campground", CampgroundRoutes);
app.use("/yelpcamp/campground/:id/comment", CommentRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});