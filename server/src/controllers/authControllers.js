var jwt = require('jsonwebtoken');
var secret = require("../db/jwt_secret");

class AuthController {
    static async verifyUserToken(req, res, next) {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'No Token Provided'
            });
        }
        const jwtToken = token.split(' ')[1];
        try {
            const decoded = await jwt.verify(jwtToken, secret);
            req.user = decoded.user;
            next();
            return true;
        } catch (err) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid Auth Token'
            });
        }
    }

    static async verifyAdminToken(req, res, next) {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'No Token Provided'
            });
        }
        const jwtToken = token.split(' ')[1];
        try {
            const decoded = await jwt.verify(jwtToken, secret);
            if (!decoded.isCaterer) {
                throw new Error('Unauthorized');
            }
            req.caterer = decoded.caterer;
            next();
            return true;
        } catch (err) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized'
            });
        }
    }
}

module.exports = AuthController;
