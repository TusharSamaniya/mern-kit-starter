import { messageModel } from "../models/messageModel.js"
import { sendAutoReplyMessage } from "./utils/utils.js"

// @desc create message
// @route POST /api/admin/message
// @access public
export const createMessageController = async (req, res) => {
    const { name, email, message } = req.body
    console.log('reqched', req.body)
    if (!message) {
        return res.status(400).json({
            success: true,
            error: null,
            message: 'Title, email and message are mandatory',
            data: null
        })
    }
    try {
        await messageModel.create({
            name, message, email
        })
        sendAutoReplyMessage(email)
        return res.status(200).json({
            success: true,
            error: null,
            message: 'Message sent succesfully',
            data: null
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            error: error.name,
            data: null
        })
    }
}
