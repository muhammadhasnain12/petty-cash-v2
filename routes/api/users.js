const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
var validator = require("email-validator");
const jwt = require('jsonwebtoken');
const auth = require("../auth");

// User Model
const User = require('../../models/User');
const UserSession = require('../../models/UserSession');
const postAdd = require('../../models/postAdd');
const employeeAdd = require('../../models/postAdd')


// @route   POST api/Users/signup
// @desc    Create An User
// @access  Public
router.post('/signup', (req, res, next) => {
    const { body } = req;
    const {
        userName,
        password
    } = body;
    let {
        email
    } = body;

    if (!userName) {
        return res.send({
            success: false,
            message: 'Error: First name cannot be blank.'
        });
    }

    let mailValidation = validator.validate(email)
    if (!mailValidation) {
        return res.send({
            success: false,
            message: 'Error: Pleae Enter right format of email.'
        });
    }

    if (!email) {
        return res.send({
            success: false,
            message: 'Error: Email cannot be blank.'
        });
    }

    if (!password) {
        return res.send({
            success: false,
            message: 'Error: Password cannot be blank.'
        });
    }
    email = email.toLowerCase().trim();
    email = email.trim();
    let defaultRole = ['/', '/employee'];
    if (email.split('@')[1] === 'admin.com') {
        defaultRole = ['/', '/repoting-manager']
    }
    else if (email.split('@')[1] === 'accounts.com') {
        defaultRole = ['/', '/accounts']
    }

    if (email.split)
        // Steps:
        // 1. Verify email doesn't exist
        // 2. Save
        User.find({
            email: email
        }, (err, previousUsers) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }
            else if (previousUsers.length > 0) {
                return res.send({
                    success: false,
                    message: 'Error: Account already exist.'
                });
            }

            // Save the new user
            const newUser = new User();
            newUser.userName = userName;
            newUser.email = email;
            newUser.password = newUser.generateHash(password);
            newUser.roles = defaultRole
            newUser.save((err, user) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error: Server error'
                    });
                }
                return res.send({
                    success: true,
                    message: 'Signed up'
                });
            });
        });
});

// @route   POST api/Users/signin
// @desc    Create An UserSession
// @access  Public
router.post('/signin', (req, res, next) => {
    const { body } = req;
    const {
        password
    } = body;
    let {
        userName
    } = body;
    if (!userName) {
        return res.status(400).json({
            message: 'Error: Email cannot be empty'
        })
    }
    if (!password) {
        return res.status(400).json({
            message: 'Error: password cannot be empty'
        })
    }
    userName = userName.toLowerCase().trim();
    User.find({
        email: userName
    }, (err, users) => {
        if (err) {
            console.log('err 2:', err);
            return res.send({
                success: false,
                message: 'Error: server error'
            });
        }
        if (users.length != 1) {
            return res.send({
                success: false,
                message: 'Error: Invalid userName'
            });
        }
        const user = users[0];
        //Generate Jwt Token
        var token = jwt.sign({ userToken: user._id }, '09f26e402586e2faa8da4c98a35f1b20d6b033c60');

        if (!user.validPassword(password)) {
            return res.send({
                success: false,
                message: 'Error: Invalid Password'
            });
        }
        req.session.jwtToken = token

        // Otherwise correct user
        const userSession = new UserSession();
        userSession.userId = user._id;
        userSession.jwtToken = user
        userSession.save((err, doc) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: server error'
                });
            }
            return res.send({
                success: true,
                message: 'Valid sign in',
                token: token,
                userId: user._id,
                payload: user
            });
        });
    });
});

// @route   POST api/Users/employeeAdd
// @desc    Add Employee details
// @access  Private
router.post('/employeeAdd', auth, (req, res) => {
    const { body } = req;
    const {
        empName,
        empDesignation,
        amount,
    } = body;
    console.log("employee name", empName)

    const empAdd = new employeeAdd();
    empAdd.empName = empName
    empAdd.empDesignation = empDesignation
    empAdd.amount = amount

    empAdd.save((err, user) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        }
        return res.send({
            success: true,
            message: 'Employee Detail Save'
        });
    });
});


// @route   GET api/Users/getemployee
// @desc    Get employee details
// @access  Public
router.get('/getemployee', (req, res) => {

    employeeAdd.find((err, user) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error',
                error: err
            });
        }
        return res.send({
            success: true,
            payload: user
        });
    });
});


// @route   GET api/Users//statusupdate/:id/status/:value
// @desc    Update employee status
// @access  Public
router.put('/statusupdate/:id/status/:value', (req, res) => {
    employeeAdd.findByIdAndUpdate(
        req.params.id,
        {
            applicationStatus: req.params.value,
        },
        { new: true }
    )
        .then((data) => {
            return res.status(200).send({
                message: "Status update with id " + req.params.value,
                payload: data
            });
        })
        .catch((err) => {
            return res.status(500).send({
                message: "Error updating status with id " + req.params.value,
            });
        });
});


module.exports = router;