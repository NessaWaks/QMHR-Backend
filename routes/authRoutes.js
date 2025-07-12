const router = require('express').Router();
const authCtrl = require('../controllers/authController');

router.post('/signup', authCtrl.signup);
router.post('/verify-otp', authCtrl.verifyOtp);
router.post('/login', authCtrl.login);
router.post('/resend-otp', authCtrl.resendOtp);
router.post('/forgot-password', authCtrl.forgotPassword);
router.post('/reset-password', authCtrl.resetPassword);


module.exports = router;
