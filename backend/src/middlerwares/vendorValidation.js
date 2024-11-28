const Joi = require("joi");

const handleVendorSignUpValidation = (req, res, next) => {
  const schema = Joi.object({
    vendorname: Joi.string().min(0).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
    phoneNumber: Joi.number().required(),
    companyName: Joi.string().min(2).max(100).required(),
    streetName: Joi.string().min(2).max(100).required(),
    city: Joi.string().min(2).max(100).required(),
    state: Joi.string().min(2).max(100).required(),
    zipCode: Joi.number().required(),
    country: Joi.string().min(2).max(100).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: "Bad request", error });
  next();
};

const handleVendorLoginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: "Bad request", error });
  next();
};


const MaterialParse = (req, res, next) => {
  try {
    // Parse JSON fields if they exist
    if(req.body.addtype) req.body.addtype = req.body.addtype;
    if (req.body.basic_detail) {
      req.body.basic_detail = JSON.parse(req.body.basic_detail);
    }
    if (req.body.material_properties) {
      req.body.material_properties = JSON.parse(req.body.material_properties);
    }
    if (req.body.supply_detail) {
      req.body.supply_detail = JSON.parse(req.body.supply_detail);
    }
    if(req.body.vendor_contact) {
      req.body.vendor_contact = JSON.parse(req.body.vendor_contact)
    }
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid JSON format", success: false });
  }
};


const handleVendorHistoryValidation = (req, res, next) => {
  const schema = Joi.object({
    addtype: Joi.string().valid("material").required(),

    basic_detail: Joi.object({
      material_name: Joi.string().required(),
      material_cat: Joi.string().required(),
      addtional_detail: Joi.string().required(),
    }).required(),

    material_properties: Joi.object({
      material_properties: Joi.array().items(Joi.object()).required(), // Adjust the shape based on item structure if necessary
    }).required(),
    vendor_contact: Joi.object({
      street:Joi.string().required(),
      company:Joi.string().required(),
      city:Joi.string().required(),
      zip:Joi.string().required(),
      state:Joi.string().required(),
      country:Joi.string().required(),
    }).required(),

    supply_detail: Joi.object({
      supply_cat: Joi.array().required(),
      supply_quant: Joi.number().required(),
      supply_quant_unit: Joi.string().required(),
      supply_lead: Joi.number().required(),
      supply_lead_unit: Joi.string().required(),
      supply_price: Joi.number().required(),
      supply_curr: Joi.string().required(),
      supply_curr_unit: Joi.string().required(),
    }).required(),
    // material_photo: Joi.object().required(),
    // datasheet_pdf: Joi.object().required(),
    owner: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: "Bad request", error });
  next();
};



const ProcessParse = (req, res, next) => {
  try {
    // Parse JSON fields if they exist
    if(req.body.addtype) req.body.addtype = req.body.addtype;
    if (req.body.basic_detail) {
      req.body.basic_detail = JSON.parse(req.body.basic_detail);
    }
    if (req.body.specification) {
      req.body.specification = JSON.parse(req.body.specification);
    }
    if (req.body.production_detail) {
      req.body.production_detail = JSON.parse(req.body.production_detail);
    }
    if(req.body.vendor_contact) {
      req.body.vendor_contact = JSON.parse(req.body.vendor_contact)
    }
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid JSON format", success: false });
  }
};

const handleVendorProcessValidation = (req, res, next) => {
  const schema = Joi.object({
    addtype: Joi.string().valid("process").required(),

    basic_detail: Joi.object({
      process_name: Joi.string().required(),
      process_cat: Joi.string().required(),
      addition_data: Joi.string().required(),
      // photo_url: Joi.object().required(), // Assuming it's a URL; adjust as needed
    }).required(),
    vendor_contact: Joi.object({
      street:Joi.string().required(),
      company:Joi.string().required(),
      city:Joi.string().required(),
      zip:Joi.string().required(),
      state:Joi.string().required(),
      country:Joi.string().required(),
    }).required(),

    specification: Joi.object({
      compactible_mat: Joi.string().required(),
      process_para: Joi.string().required(),
      operation_condi: Joi.string().required(),
    }).required(),

    production_detail: Joi.object({
      volume_cap: Joi.string().required(),
      lead_time: Joi.string().required(),
      cost: Joi.array().required(),
    }).required(),
    owner: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: "Bad request", error });
  next();
};

module.exports = {
  handleVendorSignUpValidation,
  handleVendorLoginValidation,
  handleVendorHistoryValidation,
  handleVendorProcessValidation,
  MaterialParse,
  ProcessParse,
};
