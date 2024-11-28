const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const otpSchema = new mongoose.Schema(
    {
        owner:{
            type:Schema.Types.ObjectId,
            ref:"users",
            required:true
        },
        otp : {
            type : Number,
        },
        otpExpire : {
            type : Date,
            default : Date.now,
            expires: 300
        }
    }
)

const userOtp = mongoose.model("otp",otpSchema);
module.exports = userOtp;