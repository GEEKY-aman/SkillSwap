import React, { useEffect, useState } from 'react';
import { Trophy, Timer, Flame, BarChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/ToastContext';
import { quizService } from '../src/services/api';

export const Quizzes: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await quizService.getQuizzes();
        setQuizzes(response.data);
      } catch (error) {
        addToast('Failed to load quizzes', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [addToast]);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mb-2">
            <Trophy size={24} />
          </div>
          <h3 className="text-3xl font-bold">12</h3>
          <p className="text-slate-400 text-sm">Completed Quizzes</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center mb-2">
            <BarChart size={24} />
          </div>
          <h3 className="text-3xl font-bold">85%</h3>
          <p className="text-slate-400 text-sm">Average Score</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-orange-500/20 text-orange-400 rounded-full flex items-center justify-center mb-2">
            <Flame size={24} />
          </div>
          <h3 className="text-3xl font-bold">5 Day</h3>
          <p className="text-slate-400 text-sm">Streak</p>
        </div>
      </div>

      <h2 className="text-xl font-bold">Recommended Quizzes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-2 text-center text-slate-400">Loading quizzes...</div>
        ) : quizzes.length > 0 ? (
          quizzes.map((quiz, idx) => (
            <div key={idx} className={`bg-slate-800 rounded-2xl p-6 border ${idx === 0 ? 'border-blue-500 shadow-lg shadow-blue-500/10' : 'border-slate-700'} relative overflow-hidden`}>
              {/* Glow effect for active cards */}
              {idx === 0 && (
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
              )}

              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">{quiz.title}</h3>
                  <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-md">Topic: {quiz.topic}</span>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full bg-slate-700 ${quiz.difficulty === 'Easy' ? 'text-green-400' : quiz.difficulty === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                  {quiz.difficulty}
                </span>
              </div>

              <div className="flex items-center gap-6 mb-8 text-sm text-slate-400">
                <span>{quiz.questionsCount} Questions</span>
                <span className="flex items-center gap-1"><Timer size={14} /> {quiz.duration}</span>
              </div>

              <button
                onClick={() => navigate(`/quiz/${quiz._id}`)}
                className="w-full bg-[#a3e635] text-slate-900 font-bold py-3 rounded-xl hover:bg-[#bef264] transition-colors"
              >
                Start Quiz
              </button>
            </div>
          ))
        ) : (
          // Fallback mock data
          [
            { title: "React Native Basics", topic: "Mobile Dev", q: 15, min: "20m", diff: "Easy" },
            { title: "Python Data Structures", topic: "Python", q: 30, min: "45m", diff: "Medium" }
          ].map((quiz, idx) => (
            <div key={idx} className="bg-slate-800 rounded-2xl p-6 border border-slate-700 relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">{quiz.title}</h3>
                  <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-md">Topic: {quiz.topic}</span>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-700 text-green-400">
                  {quiz.diff}
                </span>
              </div>

              <div className="flex items-center gap-6 mb-8 text-sm text-slate-400">
                <span>{quiz.q} Questions</span>
                <span className="flex items-center gap-1"><Timer size={14} /> {quiz.min}</span>
              </div>

              <button
                className="w-full bg-[#a3e635] text-slate-900 font-bold py-3 rounded-xl hover:bg-[#bef264] transition-colors"
              >
                Start Quiz
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};