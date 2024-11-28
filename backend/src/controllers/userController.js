const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const History = require('../models/userLikedPart');
const Otp = require('../models/userOtp')
const mailer = require('../helpers/mailer')


const handleUserSignUp = async(req,res) => {
    try {
        const {username,email,password,phoneNumber,jobTitle} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(409).json({message:'User is already exist, you can login',success:false});
        }
        const userModel = new UserModel({username,email,password,phoneNumber,jobTitle});
        userModel.password = await bcrypt.hash(password,10);
        userModel.save();
        res.status(201).json({message:"Sign Up Successfully",success:true});
    } catch (err) {
        res.status(500).json({message:"Internal Server Error",success:false});
    }
}



const handleUserLogin = async(req,res) => {
    try {
        const {email,password} = req.body;
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(403).json({message:'User not exist',success:false});
        }
        const isPassEqual = await bcrypt.compare(password,user.password);
        if(!isPassEqual){
            return res.status(403).json({message:'Password is wrong',success:false});
        }

        const jwtToken = jwt.sign(
            {email:user.email,_id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'24h'}
        )
        res.status(200).json({
            message:"Login Successfull",
            success:true,
            jwtToken,
            email,
            phoneNumber:user.phoneNumber,
            username:user.username,
            jobTitle:user.jobTitle,
            typeIs:"User"
        });
    } catch (err) {
        res.status(500).json({message:"Internal Server Error",success:false});
    }
}


const handleUserLikedPart = async(req,res) => {
    try {
        const {vendor_id,material_name,availability,owner} = req.body;
        if (!owner || !vendor_id || !material_name || !availability === undefined) {
            return res.status(400).json({ message: "All fields are required." });
        }
        const userHistory = new History({vendor_id:vendor_id,material_name:material_name,availability:availability,owner:owner});
        await userHistory.save();
        await UserModel.findByIdAndUpdate(
            owner, 
            { $push: { likedPart: userHistory }},
            
        );
        res.status(201).json({ message: "Liked part added successfully", userHistory });
    } catch (err) {
        console.error(err);
        res.status(500).json({message:"Internal Server Error",success:false});
    }
}

const handleAllUser = async(req, res) => {
    try {
      const users = await UserModel.find()
      .populate('likedPart')
      .populate('otp');

    //   console.log(users);
      res.json(users);
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
        const emailUser = await UserModel.findOne({email});
        if(!emailUser){
            return res.status(403).json({message:'Email not found',success:false});
        }
        const sendToUser = new Otp({otp:getOtp,owner:owner});
        const user = await UserModel.findById(owner);
        
        await sendToUser.save();
        await UserModel.findByIdAndUpdate(
            owner,
            {$push:{otp:sendToUser}},
        );
        const msg = '<p> Hi <b>' + user.username + ',<br> </b> <n>Otp is </n> <b>'+ getOtp +'</b> </p>';
        mailer.sendMail(user.email, 'User Otp Verification ',msg);//in helper folder
        res.status(201).json({message:"otp email sent",success:true})
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Internal Server Error",success:false})
    }
}
//update password


const handleUpdateUserPassword = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Hash the new password before saving
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Update the password field
      user.password = hashedPassword;
      await user.save();
      const msg = '<p> Hi <b>' + user.username + ',<br> </b>Your new password is  <h4>'+ password +'</h4> </p>';
      mailer.sendMail(user.email, 'Dear user your new Password',msg);//in helper folder
      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    handleUserSignUp,
    handleUserLogin,
    handleUserLikedPart,
    handleAllUser,
    sendOtp,
    handleUpdateUserPassword,
};