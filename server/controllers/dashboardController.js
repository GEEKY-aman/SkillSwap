const User = require('../models/User');
const Job = require('../models/Job');
const Hackathon = require('../models/Hackathon');
const Course = require('../models/Course');
const Quiz = require('../models/Quiz');
const Post = require('../models/Post');
const Room = require('../models/Room');

// @desc    Get dashboard stats
// @route   GET /api/dashboard
// @access  Private
const getDashboard = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        // User's personal stats
        const jobsApplied = await Job.countDocuments({ applicants: req.user.id });
        const hackathonsJoined = await Hackathon.countDocuments({ registeredUsers: req.user.id });
        const coursesEnrolled = await Course.countDocuments({ enrolledUsers: req.user.id });

        // Quiz stats
        const quizzes = await Quiz.find({ 'attempts.user': req.user.id });
        let quizzesCompleted = 0;
        quizzes.forEach(quiz => {
            const userAttempts = quiz.attempts.filter(a => a.user.toString() === req.user.id);
            quizzesCompleted += userAttempts.length;
        });

        // Top mentors (users with most skills)
        const topMentors = await User.find({ status: 'Active' })
            .select('name avatar role skills bio')
            .sort({ xp: -1 })
            .limit(3);

        res.json({
            user: {
                name: user.name,
                coins: user.coins,
                streak: user.streak,
                xp: user.xp,
            },
            stats: {
                jobsApplied,
                hackathonsJoined,
                coursesEnrolled,
                quizzesCompleted,
            },
            topMentors,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get admin dashboard stats
// @route   GET /api/dashboard/admin
// @access  Private (Admin)
const getAdminDashboard = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalJobs = await Job.countDocuments();
        const totalHackathons = await Hackathon.countDocuments();
        const totalCourses = await Course.countDocuments();
        const totalPosts = await Post.countDocuments();
        const activeRooms = await Room.countDocuments({ active: true });

        // Recent users
        const recentUsers = await User.find()
            .select('name email role status avatar createdAt')
            .sort({ createdAt: -1 })
            .limit(10);

        // Recent jobs
        const recentJobs = await Job.find()
            .select('title company active')
            .sort({ createdAt: -1 })
            .limit(5);

        // Recent hackathons
        const recentHackathons = await Hackathon.find()
            .select('title status')
            .sort({ createdAt: -1 })
            .limit(5);

        res.json({
            stats: {
                totalUsers,
                totalJobs,
                totalHackathons,
                totalCourses,
                totalPosts,
                activeRooms,
            },
            recentUsers,
            recentJobs,
            recentHackathons,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getDashboard, getAdminDashboard };
