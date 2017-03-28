var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var AuthService = require('./services/AuthService.js');
Msg = require('./services/Msg.js');
var Polices = require('./config/policies.js');

app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

function authChecker(req, res, next) {
    if (Polices[req.path]) return next()

    if (!req.headers['authorization']) {
        return res.status(409).json(Msg.getMessage(409));
    }
    AuthService.getUser(req.headers['authorization'], function(user) {
        if (user) {
            req.user = user
            next();
        } else {
            res.status(409).json(Msg.getMessage(409));
        }
    })

}

app.use(authChecker);

app.use('/', require('./router'));
app.secret = "Your Secret";

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;