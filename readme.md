# Campground API

Welcome to the Campground Website project! This web application allows registered users to add and review campsites they have visited. Users can share their experiences by leaving comments and ratings on each campsite.

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- Passport.js for authentication
- Express-sanitizer for data sanitization

## Features

- User Registration and Authentication: Users can create accounts and log in securely using Passport.js authentication.

- Campsite Management: Authenticated users can add new campsites to the website, including details like name, description, and an image.

- Comment System: Users can leave comments on individual campsite pages to share their thoughts and experiences.

- Rating System: Users can rate campsites based on their experiences, providing valuable feedback to others.

- Data Sanitization: Express-sanitizer is used to prevent Cross-Site Scripting (XSS) attacks by sanitizing user-generated HTML and scripts.
## Installation

1. Clone this repository to your local machine using:

   ```bash
   git clone https://github.com/yakubu-josiah/campground_API