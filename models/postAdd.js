const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


// Create Scheme
const EmployeeAddSchema = new Schema({
    empName: {
        type: String,
        default: '',
        required: true
    },
    empDesignation: {
        type: String,
        default: '',
        required: true
    },
    amount: {
        type: String,
        default: '',
        required: true
    },
    applicationStatus: {
        type: String,
        default: 'pending',
        required: true
    }
});


module.exports = employeeAdd = mongoose.model('employeeAdd', EmployeeAddSchema);