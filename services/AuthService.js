var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = {
    generateUserToken: function(user) {
        var issueDate = moment().utc().format();

        var token = jwt.encode({
            id: user.id,
            issued: issueDate
        }, app.secret);

        return token;
    },

    getUser: function(token, cb) {
        var tokenObj = jwt.decode(token, app.secret);
        var userid = tokenObj.id;

        app.models.user.findOne({
                id: userid
            })
            .then(function(user) {
                cb(user);
            })
            .catch(function(err) {
                console.log(err);
                return null;
            });
    }
}