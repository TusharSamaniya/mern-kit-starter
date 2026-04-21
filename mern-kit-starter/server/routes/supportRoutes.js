// routes/userRoutes.js
import express from 'express';
import {
    createMessageController
} from '../controllers/supportController.js';

// creating Router instance
const router = express.Router();


// routes for messages 
router.post('/message', createMessageController); // Create a new message

export default router;