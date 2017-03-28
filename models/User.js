var Waterline = require('waterline');
var bcrypt = require('bcrypt');

var User = Waterline.Collection.extend({
    identity: 'user',
    connection: 'localMysql',

    attributes: {

        email: {
            type: 'string',
            email: true,
            required: true,
            unique: true
        },
        username: {
            type: 'string',
            required: true,
            unique: true
        },

        name: {
            type: 'string',
            required: true,
        },

        password: {
            type: 'string',
            required: true
        },
        company_id: {
            type: 'integer',
            required: true
        },
        role: {
            type: 'integer',
            required: true,
            enum: [1, 2]
        },
        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            return obj;
        }
    },

    beforeCreate: function(values, next) {
        var bcrypt = require('bcrypt');

        bcrypt.genSalt(10, function(err, salt) {
            if (err) return next(err);

            bcrypt.hash(values.password, salt, function(err, hash) {
                if (err) return next(err);

                values.password = hash;
                next();
            });
        });
    }
});

module.exports = User;