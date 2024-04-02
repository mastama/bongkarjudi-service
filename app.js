require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const cors = require("cors");

const app = express();
const db = require("./models")
const Role = db.role;

db.sequelize.sync({force: true}).then(async () => {
    console.log("Drop and Resync DB");
    await initial(); // menunggu hingga initial selesai
}).catch(error => {
    console.error("Error occured while syncing DB: ", error);
});

/**
 * initial() function helps us to create 3 rows in database.
 */
async function initial() {
    try {
        await Role.create({
            id: 1,
            name: "user"
        });

        await Role.create({
            id: 2,
            name: "moderator"
        });

        await Role.create({
            id: 3,
            name: "admin"
        });
        console.log("Roles have been created successfully!");
    } catch (error) {
        console.error("Error occurred while creating roles: ", error)
    }
}

app.use(cors());

app.use(logger('dev'));
// parse request of content-type - application/json
app.use(express.json());
// parse request of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
