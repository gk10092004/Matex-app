const mongoose = require("mongoose");
const {Schema} = require('mongoose');

const vendorSchema = new mongoose.Schema(
    {
        vendorname:{
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
        companyName:{
            type:String,
            required:true,
        },
        streetName:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        zipCode:{
            type:Number,
            required:true
        },
        country:{
            type:String,
            required:true
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
                ref:"vendorhistory"
            }
        ],
        materialProcess:[
            {
                type:Schema.Types.ObjectId,
                ref:"materialprocess"
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

const vendorModel = mongoose.model("vendors",vendorSchema);
module.exports = vendorModel;