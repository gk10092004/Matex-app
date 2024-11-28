const express = require('express');
const cors = require('cors')
const {otpValidator} = require('../helpers/validator');
const {handleUserSignUpValidation,handleUserLoginValidation,handleUserHistoryValidation} = require('../middlerwares/userValidation')
const {handleUserSignUp,handleUserLogin,handleUserLikedPart,handleAllUser,sendOtp,handleUpdateUserPassword} = require('../controllers/userController')
const router = express.Router();
router.use(cors())

router.post("/signup",handleUserSignUpValidation,handleUserSignUp);
router.post("/login",handleUserLoginValidation,handleUserLogin);
router.post("/history",handleUserHistoryValidation,handleUserLikedPart);
router.get("/all-user",handleAllUser);
router.post('/send-otp', otpValidator, sendOtp );
router.put('/password-reset',handleUpdateUserPassword)


module.exports = router;