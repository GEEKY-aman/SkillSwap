const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['student', 'mentor', 'recruiter', 'admin'],
        default: 'student',
    },
    skills: [String],
    avatar: String,
    bio: String,
    location: String,
    website: String,
    github: String,
    linkedin: String,
    twitter: String,
    // Gamification
    coins: { type: Number, default: 1000 },
    streak: { type: Number, default: 0 },
    xp: { type: Number, default: 0 },
    lastLoginDate: Date,
    // Skill Match
    offering: String,
    seeking: String,
    status: { type: String, enum: ['Active', 'Suspended'], default: 'Active' },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
