const { check } = require('express-validator')

exports.otpValidator = [
    check('email','Please include a valid email').isEmail().normalizeEmail({
        gmail_remove_dots : true
    })
]