const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const processSchema = new mongoose.Schema(
    {
        addtype: { type: String, required: true },
        basic_detail: {
            process_name: { type: String, required: true },
            process_cat: { type: String, required: true },
            addition_data: { type: String, required: true },
        },
        specification: {
            compactible_mat:{type:String,required:true},
            process_para:{type:String,required:true},
            operation_condi:{type:String,required:true},
        },
        production_detail: {
            volume_cap: { type: String, required: true },
            lead_time: { type: String, required: true },
            cost:{type:Array,required:true},
        },
        vendor_contact:{
            street:{type:String,require:true},
            city:{type:String,require:true},
            zip:{type:String,require:true},
            company:{type:String,require:true},
            state:{type:String,require:true},
            country:{type:String,require:true},
        },
        photo_url: { type: String, required: false },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"vendors",
            required:true
        }
    },
    {
        timestamps: true,
    }
);

const vendorProcess = mongoose.model("materialprocess", processSchema);
module.exports = vendorProcess;
