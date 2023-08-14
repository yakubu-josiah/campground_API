var mongoose = require("mongoose");
const Campground = require("./models/Campgrounds");
const Comments = require("./models/Comments");

var camps = [
    {
        name: "Alfie Solomon Camp",
        image: "http://findFakeImage.com",
        description: "This camp site is very beatiful and it has lots of mountain lions here. Just so you know be careful around this camp.."
    },
    {
        name: "Mckienze Klan Camp",
        image: "http://findFakeImage.com",
        description: "This camp site is very beatiful and it has lots of mountain lions here. Just so you know be careful around this camp.."
    },
    {
        name: "Sahara Dese Camp",
        image: "http://findFakeImage.com",
        description: "This camp site is very beatiful and it has lots of mountain lions here. Just so you know be careful around this camp.."
    }
]

function seedDB() {
    Campground.remove({}, function (err) {
        if (err) {
            console.log("Error refreshing DB");
        }
        console.log("DB refreshed successfully...");
        camps.forEach(camp => {
            Campground.create(camp, function (err, newCamp) {
                if (err) {
                    console.log("Oops couldn't create!!!");
                    console.log(err);
                } else {
                    Comments.create({
                        name: "AdrianTour",
                        comment: "How I wish this camp has internet"
                    }, function (err, comment) {
                        if (err) {
                            console.log("Error!! couldn't add comments to the Camps created!");
                            console.log(err);
                        } else {
                            console.log("Created new camps with comments!!!");
                            newCamp.comments.push(comment);
                            newCamp.save();
                        }
                    });
                }
            });
        });
    })
}

module.exports = seedDB;