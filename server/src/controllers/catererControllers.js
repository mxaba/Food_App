var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
//var Caterer = require'../models/caterer';
var secret = require("../db/jwt_secret");

class CatererController {
    static async registerCaterer(req, res) {
        try {
            const {
              name,
              email,
              password
            } = req.body;
            const hash = await bcrypt.hash(password, 10);
            const caterer = await Caterer.create({
              name,
              email,
              password: hash
            });
            const safeCaterer = {
                id: 2,
                name: caterer.name,
                email: caterer.email,
                
            };
            const jwtToken = jwt.sign({ caterer: safeCaterer, isCaterer: true }, secret, {
                expiresIn: 86400
            });
            return res.status(201).json({
                status: 'success',
                message: 'Caterer Registered',
                token: `Bearer ${jwtToken}`,
                caterer: safeCaterer
            });
        } catch (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message
            });
        }
    }

    static async loginCaterer(req, res) {
        try {
            const { email, password } = req.body;
            const caterer = await Caterer.findOne({ where: { email } });
            if (!caterer) {
                throw new Error('Caterer with that email does not exist');
            }
            const result = await bcrypt.compare(password, caterer.password);
            if (!result) {
                throw new Error("Password doesn't match our records");
            }
            const safeCaterer = {
                id: caterer.id,
                name: caterer.name,
                email: caterer.email,
                
            };
            const jwtToken = jwt.sign({ caterer: safeCaterer, isCaterer: true }, secret, {
                expiresIn: 86400
            });
            return res.status(200).json({
                status: 'success',
                message: 'Caterer Logged In',
                token: `Bearer ${jwtToken}`,
                user: safeCaterer
            });
        } catch (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message
            });
        }
    }
}

module.exports = CatererController;
