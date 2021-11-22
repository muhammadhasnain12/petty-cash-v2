import axios from 'axios';

import {
    getFromStorage,
    setInStorage,
} from '../utils/storage';

// Creates Token and UserSchema
export async function signinUser(user) {
    var data_success, data_token, data_error, user_id;
    // console.log("Sign in" + "\nEmail: " + user.email + "\nPassword: " + user.password);
    await axios
        .post('/api/users/signin', user)
        .then(function (res) {
            // console.log(res);
            if (res.data.success) {
                setInStorage('react_login_app', { token: res.data.token, userId: res.data.userId, user: res.data.payload });
                data_success = res.data.success;
                data_token = res.data.token;
                data_error = res.data.message;
                user_id = res.data.userId
            }
            else {
                data_success = res.data.success;
                data_error = res.data.message;
            }
        })
    const data = {
        success: data_success,
        token: data_token,
        message: data_error,
        userId: user_id
    }
    // console.log(data);
    return data;
}

// Add's a User
export async function addUser(newUser) {
    var data_success, data_error;
    await axios
        .post('/api/users/signup', newUser)
        .then(function (res) {
            data_success = res.data.success;
            data_error = res.data.message;
        })
    const data = {
        success: data_success,
        message: data_error
    }
    return data;
}

// Add Employee details
export async function addEmployee(addDetails) {
    var data_success, data_error;
    const getToken = getFromStorage('react_login_app')
    await axios
        .post('api/users/employeeAdd', addDetails, {
            headers: {
                'authorization': getToken.token,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }})
        .then(function (res) {
            data_success = res.data.success;
            data_error = res.data.message;
        })
    const data = {
        success: data_success,
        message: data_error
    }
    return data;
}

// Get Employee details
export async function getEmployee() {
    var data_success, data_error;
    const getToken = getFromStorage('react_login_app')
    await axios
        .get('api/users/getemployee')
        .then(function (res) {
            data_success = res.data;
            data_error = res.data.message;
        })
    return data_success;
}


// Remove user data from storage
export async function logoutUsers() {
    localStorage.removeItem('react_login_app')
    const data = {
        success: 'ture',
        message: 'Deleted'
    }
    return data;
}
