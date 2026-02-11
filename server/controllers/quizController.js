const Quiz = require('../models/Quiz');

// @desc    Get all quizzes
// @route   GET /api/quizzes
// @access  Public
const getQuizzes = async (req, res) => {
    try {
        // Don't send questions in list view for security
        const quizzes = await Quiz.find({}).select('-questions.correctAnswer').sort({ createdAt: -1 });
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get quiz by ID with questions
// @route   GET /api/quizzes/:id
// @access  Public
const getQuizById = async (req, res) => {
    try {
        // Return questions but not correct answers (for taking the quiz)
        const quiz = await Quiz.findById(req.params.id).select('-questions.correctAnswer');
        if (quiz) {
            res.json(quiz);
        } else {
            res.status(404).json({ message: 'Quiz not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a quiz
// @route   POST /api/quizzes
// @access  Public
const createQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.create(req.body);
        res.status(201).json(quiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Submit quiz attempt
// @route   POST /api/quizzes/:id/submit
// @access  Private
const submitQuizAttempt = async (req, res) => {
    try {
        const { answers } = req.body; // Array of selected option indices

        const quiz = await Quiz.findById(req.params.id);

        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        // Calculate score
        let correctCount = 0;
        const results = quiz.questions.map((q, index) => {
            const userAnswer = answers[index];
            const isCorrect = userAnswer === q.correctAnswer;
            if (isCorrect) correctCount++;
            return {
                question: q.question,
                userAnswer,
                correctAnswer: q.correctAnswer,
                isCorrect
            };
        });

        const score = Math.round((correctCount / quiz.questions.length) * 100);

        // Save attempt if user is authenticated
        if (req.user) {
            quiz.attempts.push({
                user: req.user.id,
                score,
                date: new Date()
            });
            await quiz.save();
        }

        res.json({
            score,
            correctCount,
            totalQuestions: quiz.questions.length,
            results
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user's quiz history
// @route   GET /api/quizzes/my-attempts
// @access  Private
const getMyAttempts = async (req, res) => {
    try {
        const quizzes = await Quiz.find({ 'attempts.user': req.user.id })
            .select('title topic difficulty attempts');

        // Filter to only user's attempts
        const userAttempts = quizzes.map(quiz => ({
            quizId: quiz._id,
            title: quiz.title,
            topic: quiz.topic,
            difficulty: quiz.difficulty,
            attempts: quiz.attempts.filter(a => a.user.toString() === req.user.id)
        }));

        res.json(userAttempts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getQuizzes, getQuizById, createQuiz, submitQuizAttempt, getMyAttempts };
