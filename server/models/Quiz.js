const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    topic: { type: String, required: true },
    questionsCount: { type: Number, required: true },
    duration: { type: String, required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
    questions: [{
        question: String,
        options: [String],
        correctAnswer: Number, // Index of correct option
    }],
    attempts: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        score: Number,
        date: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);
