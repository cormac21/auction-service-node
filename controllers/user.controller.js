const Validator = require('fastest-validator')
const models = require('../models')

function save(req, res) {
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
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
        res.status(201).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong"
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

module.exports = {
    save: save,
    read: read,
    index: index,
    update: update,
    destroy: destroy
}
