const express = require('express')
const bodyParser = require('body-parser')

const app = express();

const usersRoute = require('./routes/users')

app.use(bodyParser.json())
app.use("/users", usersRoute);

module.exports = app;