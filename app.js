var express = require('express');
var path = require('path');
const session = require("express-session");
var logger = require('morgan');
var cookieParser = require('cookie-parser');
const cors = require('cors');
var app = express();

app.use(cors());
app.use(logger('dev'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(cookieParser());
//this will put body data that's json format into req.body
app.use(express.json());

//this will put url parameters into req.query
app.use(express.urlencoded({ extended: false }));
app.use(
    session({
        secret: "mysecret",
        resave: false,
        saveUninitialized: true,
    }))
app.use(express.static(path.join(__dirname, 'public')));

const errorDefault = require('./controller/error')
const indexRouter = require('./routes/api_routes');

app.use('/api', indexRouter);
app.use(errorDefault);

module.exports = app;
