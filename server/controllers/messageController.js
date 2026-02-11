const Message = require('../models/Message');
const User = require('../models/User');
const mongoose = require('mongoose');

// @desc    Get conversations (list of users you've chatted with)
// @route   GET /api/messages/conversations
// @access  Private
const getConversations = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user.id);

        // Find distinct users this user has communicated with
        const sentTo = await Message.distinct('receiver', { sender: userId });
        const receivedFrom = await Message.distinct('sender', { receiver: userId });

        const contactIds = [...new Set([...sentTo, ...receivedFrom].map(id => id.toString()))];

        const contacts = await User.find({ _id: { $in: contactIds } }).select('name avatar role');

        // Get last message for each contact
        const conversations = await Promise.all(contacts.map(async (contact) => {
            const lastMsg = await Message.findOne({
                $or: [
                    { sender: userId, receiver: contact._id },
                    { sender: contact._id, receiver: userId }
                ]
            }).sort({ createdAt: -1 });

            return {
                user: contact,
                lastMessage: lastMsg ? lastMsg.text : '',
                lastMessageTime: lastMsg ? lastMsg.createdAt : null,
            };
        }));

        conversations.sort((a, b) => (b.lastMessageTime || 0) - (a.lastMessageTime || 0));
        res.json(conversations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get messages with a specific user
// @route   GET /api/messages/:userId
// @access  Private
const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [
                { sender: req.user.id, receiver: req.params.userId },
                { sender: req.params.userId, receiver: req.user.id }
            ]
        })
            .populate('sender', 'name avatar')
            .sort({ createdAt: 1 });

        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Send a message
// @route   POST /api/messages/:userId
// @access  Private
const sendMessage = async (req, res) => {
    try {
        const receiver = await User.findById(req.params.userId);
        if (!receiver) return res.status(404).json({ message: 'User not found' });

        const message = await Message.create({
            sender: req.user.id,
            receiver: req.params.userId,
            text: req.body.text,
        });

        const populated = await message.populate('sender', 'name avatar');
        res.status(201).json(populated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getConversations, getMessages, sendMessage };
