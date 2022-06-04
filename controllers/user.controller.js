const Validator = require('fastest-validator');
const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

function save(req, res) {

    models.User.findOne({
        where: {
            email: req.body.email
        }
    }).then( result => {
        if (result) {
            res.status(409).json({
                message: "Email already exists!"
            })
        } else {
            bcryptjs.genSalt(10, function(err, salt){
                bcryptjs.hash(req.body.password, salt, function(err, hash){
                    const user = {
                        name: req.body.name,
                        email: req.body.email,
                        password: hash
                    }

                    const schema = {
                        email: {type: "string", optional: false},
                        password: {type: "string", optional: false}
                    }

                    const v = new Validator();
                    const validationObj = v.validate(user, schema);

                    if ( validationObj !== true ) {
                        return res.status(400).json({
                            message: "Validation failed",
                            errors: validationObj
                        });
                    }

                    models.User.create(user).then( result => {
                        res.status(201).json({
                            message: "User created successfully"
                        });
                    }).catch(error => {
                        res.status(500).json({
                            message: "Something went wrong",
                            error: error
                        })
                    });
                });
            });
        }
    }).catch( error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        })
    });
}

function read(req, res) {
    const id = req.params.id;

    models.User.findByPk(id).then(result => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                message: "User not found"
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!"
        });
    });
}

function index(req, res) {
    models.User.findAll().then(result => {
        res.status(200).json(result);
    }).catch( error => {
        res.status(500).json({
            message: "Something went wrong!"
        })
    });
}

function update(req, res) {
    const id = req.params.id;
    const updatedUser = {
        name: req.body.name,
        password: req.body.password
    }

    models.User.update(updatedUser, {
        where: {
            id: id
        }
    }).then( result => {
        res.status(200).json(updatedUser);
    }).catch( error => {
        res.status(500).json({
            message: "something went wrong"
        })
    });
}

function destroy(req, res) {
    const id = req.params.id;
    models.User.destroy({
        where: {
        id: id
        }
    }).then( result => {
       res.status(200).json({
           message: "User deleted successfully!"
       })
    }).catch( error => {
        res.status(500).json({
            message: "Something went wrong!"
        })
    });
}

function login(req, res) {
    models.User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if ( user === null) {
            res.status(401).json({
                message: "Invalid Credentials!"
            })
        } else {
            bcryptjs.compare(req.body.password, user.password, function(error, result){
                if (result) {
                    const token = jwt.sign({
                        email: user.email,
                        roles: user.roles
                    }, process.env.JWT_KEY, function(error, token){
                        res.status(200).json({
                           message: "Authentication successful!",
                           token: token
                        });
                    });
                } else {
                    res.status(401).json({
                        message: "Invalid Credentials!"
                    })
                }
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!"
        })
    });
}

module.exports = {
    save: save,
    read: read,
    index: index,
    update: update,
    destroy: destroy,
    login: login
}
