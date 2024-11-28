const mongoose = require("mongoose");
const {Schema} = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
        },
        phoneNumber:{
            type:Number,
            required:true,
        },
        jobTitle:{
            type:String,
            required:true,
        },
        photo:{
            type:String//remain part
        },
        otp:[//remain
            {
                type:Schema.Types.ObjectId,
                ref:"otp"
            }
        ],
        likedPart:[
            {
                type:Schema.Types.ObjectId,
                ref:"history"
            }
        ],
        refreshToken:{// remain part
            type:String
        }
    },
    {
        timestamps:true//remain part 
    }
);

const userModel = mongoose.model("users",userSchema);
module.exports = userModel;