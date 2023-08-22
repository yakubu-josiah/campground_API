const express = require("express");
const passport = require("passport");
const route = express.Router();
const Users = require("../models/Users");



route.get("/", (req, res) => {
    res.render("yelpcamp");
});


route.get("/register", function (req, res) {
    res.render("register");
});

route.post("/register", function (req, res) {
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

route.get("/login", function (req, res) {
    res.render("login");
});

route.post("/login", passport.authenticate("local", {
    successRedirect: "/yelpcamp",
    failureRedirect: "/login"
}), function (req, res) {

});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated) {
        return next();
    }
    res.redirect("/login")
}

route.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/yelpcamp");
});

module.exports = route;


