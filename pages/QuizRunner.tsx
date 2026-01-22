import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, XCircle, Timer, ArrowRight, Trophy } from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    question: "What is the primary purpose of React's useState hook?",
    options: [
      "To handle side effects",
      "To manage local component state",
      "To fetch data from an API",
      "To optimize performance"
    ],
    correct: 1
  },
  {
    id: 2,
    question: "Which CSS property is used to create a flex container?",
    options: [
      "display: block",
      "display: grid",
      "display: flex",
      "position: absolute"
    ],
    correct: 2
  },
  {
    id: 3,
    question: "In Python, which keyword is used to define a function?",
    options: [
      "func",
      "define",
      "def",
      "function"
    ],
    correct: 2
  }
];

export const QuizRunner: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (showResult) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNext();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentQuestion, showResult]);

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
  };

  const handleNext = () => {
    if (selectedOption === QUESTIONS[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setTimeLeft(30);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-8 pt-10">
        <div className="bg-slate-800 rounded-3xl p-12 border border-slate-700 shadow-2xl">
          <div className="w-24 h-24 bg-yellow-500/20 text-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy size={48} />
          </div>
          <h1 className="text-4xl font-bold mb-4">Quiz Completed!</h1>
          <p className="text-slate-400 mb-8">You scored</p>
          <div className="text-6xl font-black text-white mb-8">
            {score} <span className="text-2xl text-slate-500">/ {QUESTIONS.length}</span>
          </div>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => navigate('/quizzes')}
              className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-3 rounded-xl font-bold transition-colors"
            >
              Back to Quizzes
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="bg-[#a3e635] hover:bg-[#bef264] text-slate-900 px-8 py-3 rounded-xl font-bold transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pt-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-200">Question {currentQuestion + 1}/{QUESTIONS.length}</h2>
          <p className="text-slate-500 text-sm">React Fundamentals</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-full border border-slate-700">
          <Timer size={18} className={timeLeft < 10 ? 'text-red-500' : 'text-blue-400'} />
          <span className={`font-mono font-bold ${timeLeft < 10 ? 'text-red-400' : 'text-white'}`}>00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
        ></div>
      </div>

      {/* Question Card */}
      <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 min-h-[400px] flex flex-col">
        <h3 className="text-2xl font-bold mb-8 leading-relaxed">
          {QUESTIONS[currentQuestion].question}
        </h3>

        <div className="space-y-4 flex-1">
          {QUESTIONS[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(index)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all flex justify-between items-center group ${
                selectedOption === index 
                  ? 'border-blue-500 bg-blue-500/10 text-white' 
                  : 'border-slate-700 bg-slate-900/50 text-slate-300 hover:border-slate-500 hover:bg-slate-700'
              }`}
            >
              <span className="font-medium">{option}</span>
              {selectedOption === index && <CheckCircle size={20} className="text-blue-500" />}
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button 
            onClick={handleNext}
            disabled={selectedOption === null}
            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-bold transition-colors flex items-center gap-2"
          >
            {currentQuestion === QUESTIONS.length - 1 ? 'Finish Quiz' : 'Next Question'} <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};