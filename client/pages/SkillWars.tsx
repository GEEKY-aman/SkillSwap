import React, { useState, useEffect } from 'react';
import { Swords, Trophy, Timer, Flame, Code, Zap, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { quizService } from '../src/services/api';
import { useAuth } from '../components/AuthContext';

export const SkillWars: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'lobby' | 'battle'>('lobby');
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await quizService.getQuizzes();
        setQuizzes(res.data);
      } catch (error) {
        console.error('Failed to fetch quizzes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  if (activeTab === 'battle') {
    return <BattleView onLeave={() => setActiveTab('lobby')} quiz={quizzes[0]} />;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900 to-slate-900 rounded-3xl p-8 border border-red-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Swords size={150} />
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl font-black text-white italic tracking-wider flex items-center gap-3">
            <Swords size={40} className="text-red-500" />
            SKILL WARS
          </h1>
          <p className="text-red-200 mt-2 max-w-xl">
            Challenge your skills with quiz-based battles. Win XP, climb the leaderboard, and earn the title of Grandmaster.
          </p>
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => quizzes.length > 0 ? setActiveTab('battle') : null}
              disabled={quizzes.length === 0}
              className="bg-red-600 hover:bg-red-500 text-white px-8 py-3 rounded-xl font-bold shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-all hover:scale-105 flex items-center gap-2 disabled:opacity-50"
            >
              <Zap size={20} fill="currentColor" /> Quick Match
            </button>
            <button onClick={() => navigate('/quizzes')} className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 px-6 py-3 rounded-xl font-bold transition-colors">
              Browse Quizzes
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Available Challenges */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Flame className="text-orange-500" /> Available Quizzes
          </h2>
          {loading ? (
            <div className="flex justify-center py-10"><Loader className="animate-spin text-blue-400" size={32} /></div>
          ) : quizzes.length === 0 ? (
            <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl text-center text-slate-400">
              No quizzes available yet. Check back later!
            </div>
          ) : (
            quizzes.slice(0, 5).map((quiz) => (
              <div key={quiz._id} className="bg-slate-800 border border-slate-700 p-4 rounded-2xl flex items-center justify-between hover:border-red-500/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
                    <Code size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{quiz.title}</p>
                    <p className="text-xs text-slate-400">{quiz.topic} • {quiz.difficulty} • {quiz.questionsCount || quiz.questions?.length || 0} Qs</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/quiz/${quiz._id}`)}
                  className="text-red-400 text-sm font-bold border border-red-500/30 px-4 py-1.5 rounded-lg hover:bg-red-500/10"
                >
                  Battle
                </button>
              </div>
            ))
          )}
        </div>

        {/* User Stats */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-4">Your Stats</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-900/50 p-3 rounded-xl text-center">
              <Trophy className="mx-auto text-yellow-400 mb-1" size={20} />
              <p className="text-xl font-bold">{user?.xp || 0}</p>
              <p className="text-xs text-slate-500">XP</p>
            </div>
            <div className="bg-slate-900/50 p-3 rounded-xl text-center">
              <Swords className="mx-auto text-red-400 mb-1" size={20} />
              <p className="text-xl font-bold">{user?.streak || 0}</p>
              <p className="text-xs text-slate-500">Streak</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Coins</span>
              <span className="font-bold text-yellow-400">{user?.coins?.toLocaleString() || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BattleView: React.FC<{ onLeave: () => void; quiz?: any }> = ({ onLeave, quiz }) => {
  const [timeLeft, setTimeLeft] = useState(600);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const questions = quiz?.questions || [];
  const q = questions[currentQ];

  const handleAnswer = (idx: number) => {
    if (answered !== null) return;
    setAnswered(idx);
    if (q.options && q.options[idx] === q.answer) {
      setScore(prev => prev + 1);
    }
    setTimeout(() => {
      if (currentQ + 1 >= questions.length) {
        setFinished(true);
      } else {
        setCurrentQ(prev => prev + 1);
        setAnswered(null);
      }
    }, 1000);
  };

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  if (!quiz || questions.length === 0) {
    return (
      <div className="h-[calc(100vh-6rem)] flex flex-col items-center justify-center">
        <p className="text-slate-400 mb-4">No questions available for this battle.</p>
        <button onClick={onLeave} className="bg-slate-700 text-white px-6 py-2 rounded-xl font-bold">Back to Lobby</button>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="h-[calc(100vh-6rem)] flex flex-col items-center justify-center">
        <Trophy className="text-yellow-400 mb-4" size={64} />
        <h2 className="text-3xl font-bold mb-2">Battle Complete!</h2>
        <p className="text-xl text-slate-300 mb-1">Score: {score}/{questions.length}</p>
        <p className="text-slate-500 mb-6">Accuracy: {Math.round((score / questions.length) * 100)}%</p>
        <button onClick={onLeave} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold">Back to Lobby</button>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col">
      {/* Header */}
      <div className="bg-slate-800 p-4 flex justify-between items-center border-b border-slate-700">
        <button onClick={onLeave} className="text-slate-400 hover:text-white font-bold text-sm">← Surrender</button>
        <div className="flex items-center gap-4 bg-slate-900 px-6 py-2 rounded-full border border-red-500/30">
          <Timer className="text-red-500 animate-pulse" size={18} />
          <span className="font-mono text-xl font-bold text-white">{formatTime(timeLeft)}</span>
        </div>
        <div className="text-sm text-slate-400">Q {currentQ + 1}/{questions.length} • Score: {score}</div>
      </div>

      {/* Question */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-2xl w-full">
          <h2 className="text-2xl font-bold mb-8">{q.questionText || q.question}</h2>
          <div className="grid grid-cols-1 gap-3">
            {(q.options || []).map((opt: string, idx: number) => {
              const isCorrect = opt === q.answer;
              const isSelected = answered === idx;
              let style = 'bg-slate-800 border-slate-700 hover:border-blue-500 text-slate-200';
              if (answered !== null) {
                if (isCorrect) style = 'bg-green-600/20 border-green-500 text-green-300';
                else if (isSelected) style = 'bg-red-600/20 border-red-500 text-red-300';
              }
              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={answered !== null}
                  className={`p-4 rounded-xl border text-left font-medium transition-colors ${style}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};