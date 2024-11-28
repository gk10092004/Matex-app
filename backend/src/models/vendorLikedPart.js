const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const MaterialSchema = new mongoose.Schema(
    {
        addtype: { type: String, required: true },
        basic_detail: {
            material_name: { type: String, required: true },
            material_cat: { type: String, required: true },
            addtional_detail: { type: String, required: true },
        },
        material_properties: {
            material_properties: { type: Array, required: true },
        },
        supply_detail: {
            supply_cat: { type:Array, required: true },
            supply_quant: { type: Number, required: true },
            supply_quant_unit: { type: String, required: true },
            supply_lead: { type: Number, required: true },
            supply_lead_unit: { type: String, required: true },
            supply_price: { type: Number, required: true },
            supply_curr: { type: String, required: true },
            supply_curr_unit: { type: String, required: true },
        },
        vendor_contact:{
            street:{type:String,require:true},
            city:{type:String,require:true},
            zip:{type:String,require:true},
            company:{type:String,require:true},
            state:{type:String,require:true},
            country:{type:String,require:true},
        },
        datasheet_pdf: { type: String, required: false },
        material_photo: { type: String, required: false },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"vendors",
            required:true
        },
        process_name: { type: [String], default: [] },
    },
    {
        timestamps: true,
    }
);

const vendorLikedPart = mongoose.model("vendorhistory", MaterialSchema);
module.exports = vendorLikedPart;
