const Room = require('../models/Room');

// @desc    Get all active rooms
// @route   GET /api/rooms
// @access  Public
const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find({ active: true })
            .populate('host', 'name avatar')
            .sort({ createdAt: -1 });
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a room
// @route   POST /api/rooms
// @access  Private
const createRoom = async (req, res) => {
    try {
        const room = await Room.create({
            title: req.body.title,
            host: req.user.id,
            topic: req.body.topic,
            type: req.body.type || 'voice',
            tags: req.body.tags || [],
            participants: [req.user.id],
        });

        const populated = await room.populate('host', 'name avatar');
        res.status(201).json(populated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Join a room
// @route   PUT /api/rooms/:id/join
// @access  Private
const joinRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) return res.status(404).json({ message: 'Room not found' });

        if (!room.participants.includes(req.user.id)) {
            room.participants.push(req.user.id);
            await room.save();
        }

        const populated = await room.populate('host', 'name avatar');
        res.json(populated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Leave a room
// @route   PUT /api/rooms/:id/leave
// @access  Private
const leaveRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) return res.status(404).json({ message: 'Room not found' });

        room.participants = room.participants.filter(p => p.toString() !== req.user.id);

        // Close room if host leaves
        if (room.host.toString() === req.user.id) {
            room.active = false;
        }

        await room.save();
        res.json({ message: 'Left room' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getRooms, createRoom, joinRoom, leaveRoom };
