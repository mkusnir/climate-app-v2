const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const basicAuth = require('express-basic-auth')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Load environment variables, from .env with dotenv or from Heroku
const uri = process.env.ATLAS_URI; 
const userName = process.env.USER_ID;
const userPassword = process.env.USER_PASSWORD;

// Establish MongoDB connection
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection; connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

// Use http basic authentication
app.use(basicAuth({
    users:{ [userName]:userPassword },
    // Challenge the user if they try to connect without login info
    challenge:true,
    unauthorizedResponse: getUnauthorizedResponse
}))

// Handle incorrect logins
function getUnauthorizedResponse(req) {
    return req.auth
        ? ('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected')
        : 'No credentials provided'
}

// Routes app/climatelogs
const climateLogRouter = require('./routes/climatelogs');
app.use('/climatelogs', climateLogRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});