// routes/userRoutes.js
import express from 'express';
import { authenticatedMiddleware } from '../middleware/authMiddleware.js';
import {
    changeMailController,
    changePasswordController,
    changePhoneController,
    deleteUserController,
    forgotPasswordController,
    getUserController,
    loginController,
    logoutController,
    otpLoginController,
    refreshTokenController,
    requestForgotPasswordController,
    signupController,
    updateprofileController,
    updateSettingsController,
    verifyTokenController
} from '../controllers/userAuthController.js';
import uploadFile from '../middleware/multerMiddleware.js';

// creating Router instance
const router = express.Router();

// create post route for signup user
router.post('/signup', uploadFile.single('profileImage'), signupController,);

// create post route for login user
router.post('/login', loginController);

// create post route for login user
router.post('/otpLogin', otpLoginController);

// create a patch route to update user profile
router.patch('/updateProfile', authenticatedMiddleware, uploadFile.single('profileImage'), updateprofileController);

// create a patch route to update user settings
router.patch('/updateSettings', authenticatedMiddleware, updateSettingsController);

// create a patch route to update user email
router.patch('/changeEmail', authenticatedMiddleware, changeMailController)

// create a patch route to update user phone
router.patch('/changePhone', authenticatedMiddleware, changePhoneController)
// create a get route to verify mail
router.post('/verify/:token', verifyTokenController);

// create patch route change password route to change passsword 
router.patch('/changePassword', authenticatedMiddleware, changePasswordController);

// create a post route for request to reset password
router.post('/forgotPassword', requestForgotPasswordController);

// create a post route for request to reset password
router.post('/forgotPassword/:token', forgotPasswordController);

// create a post route to get user details
router.post('/getUser', authenticatedMiddleware, getUserController);

// create a post route to refresh the expired access token
router.post('/refreshToken', refreshTokenController);

// create a post route to logout user
router.post('/logout', logoutController);

// create a delete route to delete the user
router.post('/delete', authenticatedMiddleware, deleteUserController)



export default router;
