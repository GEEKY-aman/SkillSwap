const User = require('../models/User');
const Job = require('../models/Job');
const Hackathon = require('../models/Hackathon');
const Course = require('../models/Course');
const Quiz = require('../models/Quiz');

// @desc    Get current user profile with stats
// @route   GET /api/profile
// @access  Private
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Get user stats
        const jobsApplied = await Job.countDocuments({ applicants: req.user.id });
        const hackathonsJoined = await Hackathon.countDocuments({ registeredUsers: req.user.id });
        const coursesEnrolled = await Course.countDocuments({ enrolledUsers: req.user.id });

        // Get quiz stats
        const quizzes = await Quiz.find({ 'attempts.user': req.user.id });
        let totalQuizzes = 0;
        let totalScore = 0;
        quizzes.forEach(quiz => {
            const userAttempts = quiz.attempts.filter(a => a.user.toString() === req.user.id);
            totalQuizzes += userAttempts.length;
            userAttempts.forEach(a => totalScore += a.score);
        });
        const avgQuizScore = totalQuizzes > 0 ? Math.round(totalScore / totalQuizzes) : 0;

        res.json({
            user,
            stats: {
                jobsApplied,
                hackathonsJoined,
                coursesEnrolled,
                quizzesCompleted: totalQuizzes,
                avgQuizScore
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user profile
// @route   PUT /api/profile
// @access  Private
const updateProfile = async (req, res) => {
    try {
        const { name, skills, avatar, bio, location, website, github, linkedin, twitter } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update fields if provided
        if (name) user.name = name;
        if (skills) user.skills = skills;
        if (avatar) user.avatar = avatar;
        if (bio !== undefined) user.bio = bio;
        if (location !== undefined) user.location = location;
        if (website !== undefined) user.website = website;
        if (github !== undefined) user.github = github;
        if (linkedin !== undefined) user.linkedin = linkedin;
        if (twitter !== undefined) user.twitter = twitter;

        await user.save();

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            skills: user.skills,
            avatar: user.avatar,
            bio: user.bio,
            location: user.location,
            website: user.website,
            github: user.github,
            linkedin: user.linkedin,
            twitter: user.twitter
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getProfile, updateProfile };
