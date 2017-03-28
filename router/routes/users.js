var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var AuthServices = require('../../services/AuthService.js');
var Redis = require('../../services/Redis.js');

router.post('/login', function(req, res) {
    app.models.user.findOneByUsername(req.body.username).exec(function(err, user) {
        if (err) {
            res.status(500).json({
                error: 'Error when trying to find user.'
            });
        }
        if (user) {
            bcrypt.compare(req.body.password, user.password, function(err, match) {
                if (match) {
                    var token = AuthServices.generateUserToken(user);
                    if (token != null) {

                        Redis.setSession(token, user.id);

                        user["token"] = token
                        res.status(200).json(user);
                    } else {
                        res.status(401).json(Msg.getMessage(401));
                    }
                } else {
                    res.status(401).json(Msg.getMessage(401));
                }
            })
        } else {
            res.status(401).json(Msg.getMessage(401));
        }
    });
});

router.post('/create', function(req, res) {
    app.models.user.findOneByUsername(req.body.email).exec(function(err, user) {
        if (err) {
            res.status(500).json(Msg.getMessage(401));
        }
        if (user) {
            res.status(401).json(Msg.getMessage(401));
        } else {
            app.models.user.create(req.body, function(err, model) {
                if (err) {
                    return res.status(500).json({
                        err: err
                    });
                } else {
                    res.json(model);
                }
            });
        }
    });
});

module.exports = router;