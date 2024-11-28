const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {uploadOnCloudinary} = require('../helpers/upload')
const VendorModel = require('../models/vendorModel');
const VendorHistory = require('../models/vendorLikedPart');
const VendorProcessHistory =require('../models/vendorProcess')
const Otp = require('../models/userOtp')
const mailer = require('../helpers/mailer')



const handleVendorSignUp = async(req,res) => {
    try {
        const {vendorname,email,password,phoneNumber,companyName,streetName,city,state,zipCode,country} = req.body;
        const vendor = await VendorModel.findOne({email});
        if(vendor){
            return res.status(409).json({message:'Vendor is already exist, you can login',success:false});
        }
        const vendorModel = new VendorModel({vendorname,email,password,phoneNumber,companyName,streetName,city,state,zipCode,country});
        vendorModel.password = await bcrypt.hash(password,10);
        vendorModel.save();
        res.status(201).json({message:"Sign Up Successfully",success:true});
    } catch (err) {
        res.status(500).json({message:"Internal Server Error",success:false});
    }
}


const handleVendorLogin = async(req,res) => {
    try {
        const {email,password} = req.body;
        const vendor = await VendorModel.findOne({email});
        if(!vendor){
            return res.status(403).json({message:'Vendor not exist',success:false});
        }
        const isPassEqual = await bcrypt.compare(password,vendor.password);
        if(!isPassEqual){
            return res.status(403).json({message:'Password is wrong',success:false});
        }

        const jwtToken = jwt.sign(
            {email:vendor.email,_id:vendor._id},
            process.env.JWT_SECRET,
            {expiresIn:'24h'}
        )
        res.status(200).json({
            message:"Login Successfull",
            success:true,
            jwtToken,
            email,
            phoneNumber:vendor.phoneNumber,
            vendorname:vendor.vendorname,
            companyName:vendor.companyName,
            owner:vendor._id,
            typeIs:"Vendor",
            street:vendor.streetName,
            company:vendor.companyName,
            city:vendor.city,
            state:vendor.state,
            zip:vendor.zipCode,
            country:vendor.country,

        });
    } catch (err) {
        res.status(500).json({message:"Internal Server Error",success:false});
    }
}


const handleVendorLikedPart = async(req,res) => {
    try {
    
        const {basic_detail,material_properties,supply_detail,owner,addtype,vendor_contact } =req.body
        const {material_photo,datasheet_pdf} = req.files;

        //check vendor availibility
        const vendor = await VendorModel.findById(owner).populate('likedPart');
        if(!vendor){
            return res.status(403).json({message:"Vendor not found",success:false});
        }

        //if vendor availabel then check for material availivility
        const material_name = basic_detail.material_name;
        const materialExists = vendor.likedPart.some(part => part.basic_detail.material_name === material_name);
        if (materialExists) {
            return res.status(200).json({ success: false, message: 'Material is exists',success:false });
        }

        //conver in url
        const matImage = await uploadOnCloudinary(material_photo[0].path);
        const dataSheet = await uploadOnCloudinary(datasheet_pdf[0].path);
        const data = {
            addtype:addtype,
            basic_detail:basic_detail,
            material_properties:material_properties,
            supply_detail:supply_detail,
            vendor_contact:vendor_contact,
            owner:owner,
            material_photo:matImage,
            datasheet_pdf:dataSheet
        }

        
        const vendorHistory = new VendorHistory(data);
        await vendorHistory.save();
        await VendorModel.findByIdAndUpdate(
            owner, 
            { $push: { likedPart: vendorHistory }},
            
        );
        res.status(201).json({ message: "Material added successfully", success:true });
    } catch (err) {
        console.error(err);
        res.status(500).json({message:"Internal  Server Error",success:false});
    }
}


const handleCleanUpTempFiles = (req, res, next) => {
    if (req.files && req.files.length > 0) {
      const filePaths = req.files.map((file) => file.path);
  
      res.on('finish', () => {
        filePaths.forEach((filePath) => {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(`Error deleting temporary file ${filePath}:`, err.message);
            } else {
              console.log(`Temporary file ${filePath} cleaned up successfully.`);
            }
          });
        });
      });
    }
    next();
  };
  



const addProcessToMaterials = async(processData) => {
    try {
        const { specification:{compactible_mat}, basic_detail: { process_name } } = processData;
        const matchingVendorHistories = await VendorHistory.find({
            "basic_detail.material_name": compactible_mat
        });

        if (matchingVendorHistories.length > 0) {
            
            for (const vendor of matchingVendorHistories) {
                
                if (!vendor.process_name.includes(process_name)) {
                    vendor.process_name.push(process_name);
                    await vendor.save();
                }
            }
        } else {
            console.log('No matching materials found for this process.');
        }



    } catch (error) {
        console.error('Error adding process to material:', error);
    }
}



const handleVendorProcess = async(req,res) => {
    try {

        const {addtype,basic_detail,specification, production_detail,owner,vendor_contact  } = req.body;

        const {photo_url} = req.files
        const vendor = await VendorModel.findById(owner).populate('materialProcess');
        if(!vendor){
            return res.status(403).json({message:'Vendor not found',success:false});
        }
        const process_name = basic_detail.process_name;
        const processExists = vendor.materialProcess.some(part => part.basic_detail.process_name === process_name);
        if (processExists) {
            return res.status(200).json({ success: false, message: 'Process is exists',success:false });
        }
        const photoUrl = await uploadOnCloudinary(photo_url[0].path)
        const data = {
            addtype:addtype,
            basic_detail:basic_detail,
            specification:specification,
            production_detail:production_detail,
            vendor_contact:vendor_contact,
            owner:owner,
            photo_url:photoUrl
        }

        const vendorProcess = new VendorProcessHistory(data);
        await vendorProcess.save();
        await VendorModel.findByIdAndUpdate(
            owner, 
            { $push: { materialProcess: vendorProcess }},
            // { new: true, useFindAndModify: false }
        );
        await addProcessToMaterials(data);
        res.status(201).json({ message: "Process added successfully", success:true });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({message:"Internal Server Error",success:false});
    }
}



const handleAllVendors = async(req, res) => {
    try {
      const vendors = await VendorModel.find()
      .populate('likedPart')
      .populate('otp')
      .populate('materialProcess')

    //   console.log(users);
      res.json(vendors);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
}



const handleAllMaterial = async(req, res) => {
    try {
      const material = await VendorHistory.find();
    //   console.log(users);
      res.json(material);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
}


const handleAllProcess = async(req, res) => {
    try {
      const process = await VendorProcessHistory.find();
    //   console.log(users);
      res.json(process);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
}



//otp send
const generateOtp = async() => {
    return Math.floor(100000 + Math.random()*900000);
}
const sendOtp = async(req,res) => {
    try {
        const getOtp = await generateOtp();
        const {email,owner} = req.body;
        if(!email || !owner){
            return res.status(400).json({ message: "All field is required gk",email,owner });
        }
        const emailVendor = await VendorModel.findOne({email});
        if(!emailVendor){
            return res.status(403).json({message:'Email not found',success:false});
        }
        const sendToVendor = new Otp({otp:getOtp,owner:owner});
        const vendor = await VendorModel.findById(owner);
        
        await sendToVendor.save();
        await VendorModel.findByIdAndUpdate(
            owner,
            {$push:{otp:sendToVendor}},
        );
        const msg = '<p> Hi <b>' + vendor.vendorname + ',<br> </b> <n>Otp is </n> <b>'+ getOtp +'</b> </p>';
        mailer.sendMail(vendor.email, 'Vendor Otp Verification ',msg);//in helper folder
        res.status(201).json({message:"otp email sent",success:true})
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Internal Server Error",success:false})
    }
}
const handleUpdateVendorPassword = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const vendor = await VendorModel.findOne({ email });
      if (!vendor) {
        return res.status(404).json({ message: 'Vendor not found' });
      }
  
      // Hash the new password before saving
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Update the password field
      vendor.password = hashedPassword;
      await vendor.save();
      const msg = '<p> Hi <b>' + vendor.vendorname + ',<br> </b>Your new password is  <h4>'+ password +'</h4> </p>';
      mailer.sendMail(vendor.email, 'Dear vendor your new password',msg);//in helper folder
      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};


module.exports = {
    handleVendorSignUp,
    handleVendorLogin,
    handleAllVendors,
    handleVendorLikedPart,
    sendOtp,
    handleUpdateVendorPassword,
    handleVendorProcess,
    handleAllMaterial,
    handleAllProcess,
    handleCleanUpTempFiles,
}
