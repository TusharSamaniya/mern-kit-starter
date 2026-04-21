import express from 'express';
import { authenticatedMiddleware } from '../middleware/authMiddleware.js';
import {
    adminCreateAdminController,
    adminDeleteUserController,
    adminGetAllMesagesController,
    adminGetMesageByIdController,
    adminLoginController,
    adminReplyMesageController,
    adminUpdateUserController,
    getAdminController,
    getAllUserByAdminController,
    getUserById,
    logoutController,
    refreshTokenController
}
    from '../controllers/adminController.js';


// creating Router instance
const router = express.Router();


// user routes for authentication
router.post('/adminLogin', adminLoginController); // Admin login
router.post('/getAdmin', authenticatedMiddleware, getAdminController); // get admin details
router.post('/refreshToken', refreshTokenController); // refresh token 
router.post('/logout', logoutController);// log out admin
router.post('/createAdmin', adminCreateAdminController); // Admin login

// user routes performed by admin
router.get('/users', getAllUserByAdminController); // Get all user
router.get('/user/:id', authenticatedMiddleware, getUserById); // Get user by id
router.patch('/user/:id', authenticatedMiddleware, adminUpdateUserController); // Admin update user
router.delete('/user/:id', authenticatedMiddleware, adminDeleteUserController); // Admin delete user

// support routes for admin
router.get('/messages', authenticatedMiddleware, adminGetAllMesagesController); // Admin get all messages
router.get('/message/:id', authenticatedMiddleware, adminGetMesageByIdController); // Admin get message by id
router.patch('/message/:id', authenticatedMiddleware, adminReplyMesageController); // Admin update message


export default router;