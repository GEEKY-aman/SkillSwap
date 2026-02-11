const Hackathon = require('../models/Hackathon');

// @desc    Get all hackathons
// @route   GET /api/hackathons
// @access  Public
const getHackathons = async (req, res) => {
    try {
        const hackathons = await Hackathon.find({}).sort({ createdAt: -1 });
        res.json(hackathons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get hackathon by ID
// @route   GET /api/hackathons/:id
// @access  Public
const getHackathonById = async (req, res) => {
    try {
        const hackathon = await Hackathon.findById(req.params.id).populate('registeredUsers', 'name email');
        if (hackathon) {
            res.json(hackathon);
        } else {
            res.status(404).json({ message: 'Hackathon not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a hackathon
// @route   POST /api/hackathons
// @access  Public
const createHackathon = async (req, res) => {
    try {
        const hackathon = await Hackathon.create(req.body);
        res.status(201).json(hackathon);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Register for a hackathon
// @route   POST /api/hackathons/:id/register
// @access  Private
const registerForHackathon = async (req, res) => {
    try {
        const hackathon = await Hackathon.findById(req.params.id);

        if (!hackathon) {
            return res.status(404).json({ message: 'Hackathon not found' });
        }

        // Check if user already registered
        if (hackathon.registeredUsers.includes(req.user.id)) {
            return res.status(400).json({ message: 'Already registered for this hackathon' });
        }

        hackathon.registeredUsers.push(req.user.id);
        hackathon.participants = (hackathon.participants || 0) + 1;
        await hackathon.save();

        res.json({ message: 'Successfully registered for hackathon', hackathon });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user's registered hackathons
// @route   GET /api/hackathons/my-hackathons
// @access  Private
const getMyHackathons = async (req, res) => {
    try {
        const hackathons = await Hackathon.find({ registeredUsers: req.user.id });
        res.json(hackathons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getHackathons, getHackathonById, createHackathon, registerForHackathon, getMyHackathons };
