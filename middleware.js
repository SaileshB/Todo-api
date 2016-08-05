var cryptojs = require('crypto-js');
module.exports = function(db) {
    return {
        requireAuthentication: function(req, res, next) {
            var token = req.get('Auth') || '';

            db.token.findOne({
                where: {
                    tokenHash: cryptojs.MD5(token).toString()
                }
            }).then(function(tokenInstance) {
                if (!tokenInstance) {
                    throw new Error();
                }


                res.token = tokenInstance;
                return db.user.findByToken

            }).then(function() {
                req.user = user;
                next();
            }).catch(function() {
                res.status(401).send();
            });
        }
    };
}