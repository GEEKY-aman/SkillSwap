import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './components/ToastContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Jobs } from './pages/Jobs';
import { Skills } from './pages/Skills';
import { Hackathons } from './pages/Hackathons';
import { Courses } from './pages/Courses';
import { Quizzes } from './pages/Quizzes';
import { Recruiter } from './pages/Recruiter';
import { Messages } from './pages/Messages';
import { Admin } from './pages/Admin';
import { Auth } from './pages/Auth';
import { Community } from './pages/Community';
import { Profile } from './pages/Profile';
import { Roadmap } from './pages/Roadmap';
import { LiveRooms } from './pages/LiveRooms';
import { Shop } from './pages/Shop';
import { Match } from './pages/Match';
import { AITutor } from './pages/AITutor';
import { SkillWars } from './pages/SkillWars';
import { Collaborate } from './pages/Collaborate';
import { QuizRunner } from './pages/QuizRunner';
import { Lesson } from './pages/Lesson';

const App: React.FC = () => {
  return (
    <ToastProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />

          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="match" element={<Match />} />
            <Route path="tutor" element={<AITutor />} />
            <Route path="wars" element={<SkillWars />} />
            <Route path="collaborate" element={<Collaborate />} />
            <Route path="community" element={<Community />} />
            <Route path="profile" element={<Profile />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="skills" element={<Skills />} />
            <Route path="roadmap" element={<Roadmap />} />
            <Route path="live" element={<LiveRooms />} />
            <Route path="shop" element={<Shop />} />
            <Route path="hackathons" element={<Hackathons />} />
            <Route path="courses" element={<Courses />} />
            <Route path="lesson/:id" element={<Lesson />} />
            <Route path="quizzes" element={<Quizzes />} />
            <Route path="quiz/:id" element={<QuizRunner />} />
            <Route path="recruiter" element={<Recruiter />} />
            <Route path="messages" element={<Messages />} />
            <Route path="admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </HashRouter>
      <Analytics />
    </ToastProvider>
  );
};

export default App;