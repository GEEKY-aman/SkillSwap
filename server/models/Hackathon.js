const mongoose = require('mongoose');

const hackathonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    organizer: { type: String, required: true },
    date: { type: String, required: true },
    participants: { type: Number, default: 0 },
    image: { type: String },
    tags: [String],
    status: { type: String, enum: ['Upcoming', 'Live', 'Ended'], default: 'Upcoming' },
    registeredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

module.exports = mongoose.model('Hackathon', hackathonSchema);
