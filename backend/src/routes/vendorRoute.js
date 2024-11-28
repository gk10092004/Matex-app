const express = require('express');
const cors = require('cors')
const {uploadOnCloudinary} = require('../helpers/upload')
const{otpValidator} = require('../helpers/validator')
const upload = require("../middlerwares/multer");
const {handleVendorSignUp,handleVendorLogin,handleAllVendors,sendOtp,handleVendorLikedPart, handleUpdateVendorPassword, handleVendorProcess, handleAllMaterial, handleAllProcess, handleCleanUpTempFiles} = require('../controllers/vendorController');
const {handleVendorSignUpValidation,handleVendorLoginValidation,handleVendorHistoryValidation, handleVendorProcessValidation, MaterialParse, ProcessParse} = require('../middlerwares/vendorValidation');
const router = express.Router();
router.use(cors())

router.post("/signup",handleVendorSignUpValidation,handleVendorSignUp);
router.post("/login",handleVendorLoginValidation,handleVendorLogin);
router.post("/send-otp",otpValidator,sendOtp);
router.get("/all-vendor",handleAllVendors);
// router.post("/history",handleVendorHistoryValidation,handleVendorLikedPart);
router.post(
    "/history",
    upload.fields([
      { name: "material_photo", maxCount: 1 },
      { name: "datasheet_pdf", maxCount: 1 },
    ]), // First validation middleware
    handleCleanUpTempFiles,
    MaterialParse,
    handleVendorHistoryValidation,
    handleVendorLikedPart // Final controller
  );
  router.post(
    "/process-history",
    upload.fields([
      { name: "photo_url", maxCount: 1 },
    ]), // First validation middleware
    // handleCleanUpTempFiles,
    ProcessParse,
    handleVendorProcessValidation,
    handleVendorProcess // Final controller
  );
// router.post("/process-history",handleVendorProcessValidation,handleVendorProcess)
router.put('/password-reset',handleUpdateVendorPassword);
router.get("/allMaterial",handleAllMaterial);
router.get("/allProcess",handleAllProcess)
// router.get("/allProcess",handleAllVendors);


module.exports = router;