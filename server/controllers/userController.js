const User = require('../models/User');

// @desc    Get all users (admin)
// @route   GET /api/users
// @access  Private (Admin)
const getUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select('-password')
            .sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get mentor-like user profiles for the Skills page
// @route   GET /api/users/mentors
// @access  Public
const getMentors = async (req, res) => {
    try {
        const users = await User.find({ status: 'Active' })
            .select('name avatar role skills bio location offering seeking xp')
            .sort({ xp: -1 })
            .limit(20);
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get match candidates based on skill compatibility
// @route   GET /api/users/matches
// @access  Private
const getMatches = async (req, res) => {
    try {
        const currentUser = await User.findById(req.user.id);
        // Find users who are NOT the current user
        const candidates = await User.find({
            _id: { $ne: req.user.id },
            status: 'Active',
        })
            .select('name avatar role skills bio offering seeking xp')
            .limit(10);

        res.json(candidates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user role (admin)
// @route   PUT /api/users/:id/role
// @access  Private (Admin)
const updateUserRole = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.role = req.body.role;
        await user.save();

        res.json({ _id: user._id, name: user.name, role: user.role });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Suspend or activate a user (admin)
// @route   PUT /api/users/:id/status
// @access  Private (Admin)
const updateUserStatus = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.status = req.body.status;
        await user.save();

        res.json({ _id: user._id, name: user.name, status: user.status });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Purchase item from shop (deduct coins)
// @route   POST /api/users/purchase
// @access  Private
const purchaseItem = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const { price, item } = req.body;

        if (user.coins < price) {
            return res.status(400).json({ message: 'Not enough coins' });
        }

        user.coins -= price;
        await user.save();

        res.json({ coins: user.coins, message: `Purchased ${item}!` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getUsers, getMentors, getMatches, updateUserRole, updateUserStatus, purchaseItem };
