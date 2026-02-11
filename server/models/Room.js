const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    title: { type: String, required: true },
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    topic: { type: String, required: true },
    type: { type: String, enum: ['voice', 'video'], default: 'voice' },
    tags: [String],
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    active: { type: Boolean, default: true },
}, {
    timestamps: true,
});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
