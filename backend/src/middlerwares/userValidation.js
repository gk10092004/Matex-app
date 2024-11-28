const Joi = require('joi');

const handleUserSignUpValidation = (req,res,next) => {
    const schema = Joi.object({
        username:Joi.string().min(0).max(100).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(4).max(100).required(),
        phoneNumber:Joi.number().required(),
        jobTitle:Joi.string().min(2).max(100).required(),
    });
    const {error} = schema.validate(req.body);
    if(error) return res.status(400).json({message:"Bad request",error});
    next();
}

const handleUserLoginValidation = (req,res,next) => {
    const schema = Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().min(4).max(100).required(),
    });
    const {error} = schema.validate(req.body);
    if(error) return res.status(400).json({message:"Bad request",error});
    next();
}

const handleUserHistoryValidation = (req,res,next) => {
    const schema = Joi.object({
        vendor_id:Joi.string().required(),
        material_name:Joi.string().required(),
        availability:Joi.boolean().required(),
        owner:Joi.string().required(),
        
    });
    const {error} = schema.validate(req.body);
    if(error) return res.status(400).json({message:"Bad request",error});
    next();
}


module.exports = {
    handleUserSignUpValidation,
    handleUserLoginValidation,
    handleUserHistoryValidation,
}