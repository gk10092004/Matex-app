const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const likePart = new mongoose.Schema(
    {
        vendor_id:{
            type:String,
            required:true
        },
        material_name:{
            type:String,
            required:true
        },
        availability:{
            type:Boolean,
            required:true
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"users",
            required:true
        }
    },
    {
        timestamps:true
    }
)

const userLikedPart = mongoose.model("history",likePart);
module.exports = userLikedPart;