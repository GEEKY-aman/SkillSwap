const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    instructor: { type: String, required: true },
    rating: { type: Number, default: 0 },
    students: { type: Number, default: 0 },
    price: { type: String, required: true },
    image: { type: String },
    tags: [String],
    enrolledUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
