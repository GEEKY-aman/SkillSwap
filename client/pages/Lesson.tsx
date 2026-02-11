<<<<<<< HEAD
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, FileText, Download, MessageSquare, CheckCircle } from 'lucide-react';
import { useToast } from '../components/ToastContext';

export const Lesson: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
=======
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Play, CheckCircle, Loader } from 'lucide-react';
import { useToast } from '../components/ToastContext';
import { courseService } from '../src/services/api';

export const Lesson: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToast } = useToast();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await courseService.getCourse(id!);
        setCourse(res.data);
      } catch (error) {
        console.error('Failed to fetch course:', error);
        addToast('Failed to load lesson', 'error');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto flex justify-center py-20">
        <Loader className="animate-spin text-blue-400" size={32} />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Course not found</h2>
        <button onClick={() => navigate('/courses')} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-bold">
          Back to Courses
        </button>
      </div>
    );
  }

  // Generate lesson topics from course data
  const lessons = course.lessons || [
    { title: `Introduction to ${course.title}`, duration: '10:00', completed: false },
    { title: `Core Concepts`, duration: '15:00', completed: false },
    { title: `Hands-on Practice`, duration: '20:00', completed: false },
    { title: `Advanced Topics`, duration: '12:00', completed: false },
    { title: `Final Project`, duration: '25:00', completed: false },
  ];
>>>>>>> 7fb58eb (Your commit message here)

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 pb-10">
      {/* Main Content */}
      <div className="flex-1 space-y-6">
        <button onClick={() => navigate('/courses')} className="text-slate-400 hover:text-white flex items-center gap-2 mb-2">
          <ArrowLeft size={18} /> Back to Courses
        </button>

        {/* Video Player Placeholder */}
        <div className="aspect-video bg-black rounded-2xl overflow-hidden relative group border border-slate-700 shadow-2xl">
<<<<<<< HEAD
          <img 
            src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
            className="w-full h-full object-cover opacity-60" 
            alt="Video Thumbnail" 
          />
          <div className="absolute inset-0 flex items-center justify-center">
=======
          <div className="w-full h-full bg-gradient-to-br from-blue-900/40 to-purple-900/40 flex items-center justify-center">
>>>>>>> 7fb58eb (Your commit message here)
            <button className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/20 text-white group-hover:scale-110 transition-transform">
              <Play size={32} fill="currentColor" className="ml-1" />
            </button>
          </div>
          <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
<<<<<<< HEAD
             <div className="h-1 bg-slate-700 rounded-full overflow-hidden mb-2">
               <div className="w-1/3 h-full bg-red-500"></div>
             </div>
             <div className="flex justify-between text-xs font-medium text-white">
               <span>04:20 / 12:45</span>
               <span>HD</span>
             </div>
=======
            <div className="h-1 bg-slate-700 rounded-full overflow-hidden mb-2">
              <div className="w-0 h-full bg-red-500" style={{ width: `${((activeLessonIdx + 1) / lessons.length) * 100}%` }}></div>
            </div>
            <div className="flex justify-between text-xs font-medium text-white">
              <span>Lesson {activeLessonIdx + 1} of {lessons.length}</span>
              <span>{lessons[activeLessonIdx]?.duration || '00:00'}</span>
            </div>
>>>>>>> 7fb58eb (Your commit message here)
          </div>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <div className="flex justify-between items-start mb-6">
            <div>
<<<<<<< HEAD
              <h1 className="text-2xl font-bold mb-2">Understanding React Hooks: useEffect</h1>
              <p className="text-slate-400">Chapter 4 • Lesson 3</p>
            </div>
            <button 
              onClick={() => addToast("Lesson marked as complete!")}
=======
              <h1 className="text-2xl font-bold mb-2">{lessons[activeLessonIdx]?.title || course.title}</h1>
              <p className="text-slate-400">{course.title} • Lesson {activeLessonIdx + 1}</p>
            </div>
            <button
              onClick={() => addToast("Lesson marked as complete!", 'success')}
>>>>>>> 7fb58eb (Your commit message here)
              className="border border-green-500/50 text-green-400 px-4 py-2 rounded-lg font-bold text-sm hover:bg-green-500/10 transition-colors flex items-center gap-2"
            >
              <CheckCircle size={18} /> Mark Complete
            </button>
          </div>

          <div className="prose prose-invert max-w-none text-slate-300">
<<<<<<< HEAD
            <p>
              In this lesson, we will dive deep into the dependency array of the useEffect hook. 
              Understanding when your effect runs is crucial for preventing infinite loops and ensuring 
              your application is performant.
            </p>
            <h3>Key Takeaways:</h3>
            <ul>
              <li>The dependency array controls when the effect re-runs.</li>
              <li>An empty array [] runs only once on mount.</li>
              <li>No array runs on every render (dangerous!).</li>
            </ul>
=======
            <p>{course.description}</p>
            {course.instructor && (
              <p className="text-sm text-slate-500 mt-4">Instructor: {course.instructor}</p>
            )}
>>>>>>> 7fb58eb (Your commit message here)
          </div>
        </div>
      </div>

      {/* Sidebar - Course Content */}
      <div className="w-full lg:w-96 space-y-6">
        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden flex flex-col h-[600px]">
<<<<<<< HEAD
           <div className="p-4 border-b border-slate-700 bg-slate-900/50">
             <h3 className="font-bold">Course Content</h3>
             <p className="text-xs text-slate-400 mt-1">20% Completed</p>
             <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2">
               <div className="w-1/5 h-full bg-green-500 rounded-full"></div>
             </div>
           </div>
           
           <div className="flex-1 overflow-y-auto p-2 space-y-1">
             {[
               { title: "Introduction to Hooks", dur: "05:20", active: false, completed: true },
               { title: "The useState Hook", dur: "10:15", active: false, completed: true },
               { title: "The useEffect Hook", dur: "12:45", active: true, completed: false },
               { title: "Custom Hooks", dur: "15:30", active: false, completed: false },
               { title: "Performance Optimization", dur: "08:10", active: false, completed: false },
               { title: "Context API", dur: "14:20", active: false, completed: false },
             ].map((lesson, i) => (
               <div key={i} className={`p-3 rounded-xl flex items-center gap-3 cursor-pointer ${lesson.active ? 'bg-blue-600/10 border border-blue-600/30' : 'hover:bg-slate-700/50'}`}>
                 <div className="flex-shrink-0">
                   {lesson.active ? <Play size={16} className="text-blue-400" fill="currentColor" /> : 
                    lesson.completed ? <CheckCircle size={16} className="text-green-500" /> :
                    <div className="w-4 h-4 rounded-full border-2 border-slate-600"></div>}
                 </div>
                 <div className="flex-1 min-w-0">
                   <p className={`text-sm font-medium truncate ${lesson.active ? 'text-blue-400' : 'text-slate-200'}`}>{lesson.title}</p>
                   <p className="text-xs text-slate-500">{lesson.dur}</p>
                 </div>
               </div>
             ))}
           </div>
        </div>

        <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700 space-y-3">
          <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-700 transition-colors text-left">
            <div className="bg-slate-900 p-2 rounded-lg text-blue-400"><FileText size={20} /></div>
            <div>
              <p className="font-bold text-sm">Lesson Resources</p>
              <p className="text-xs text-slate-500">Download starter code</p>
            </div>
            <Download size={16} className="ml-auto text-slate-500" />
          </button>
          <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-700 transition-colors text-left">
            <div className="bg-slate-900 p-2 rounded-lg text-purple-400"><MessageSquare size={20} /></div>
            <div>
              <p className="font-bold text-sm">Discussion</p>
              <p className="text-xs text-slate-500">12 comments</p>
            </div>
          </button>
=======
          <div className="p-4 border-b border-slate-700 bg-slate-900/50">
            <h3 className="font-bold">{course.title}</h3>
            <p className="text-xs text-slate-400 mt-1">{Math.round(((activeLessonIdx + 1) / lessons.length) * 100)}% Completed</p>
            <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2">
              <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${((activeLessonIdx + 1) / lessons.length) * 100}%` }}></div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {lessons.map((lesson: any, i: number) => (
              <div
                key={i}
                onClick={() => setActiveLessonIdx(i)}
                className={`p-3 rounded-xl flex items-center gap-3 cursor-pointer ${i === activeLessonIdx ? 'bg-blue-600/10 border border-blue-600/30' : 'hover:bg-slate-700/50'
                  }`}
              >
                <div className="flex-shrink-0">
                  {i === activeLessonIdx ? <Play size={16} className="text-blue-400" fill="currentColor" /> :
                    i < activeLessonIdx ? <CheckCircle size={16} className="text-green-500" /> :
                      <div className="w-4 h-4 rounded-full border-2 border-slate-600"></div>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${i === activeLessonIdx ? 'text-blue-400' : 'text-slate-200'}`}>{lesson.title}</p>
                  <p className="text-xs text-slate-500">{lesson.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Course Info */}
        <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Category</span>
            <span className="text-slate-200">{course.category || 'General'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Difficulty</span>
            <span className="text-slate-200">{course.level || 'Beginner'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Duration</span>
            <span className="text-slate-200">{course.duration || 'Self-paced'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Enrolled</span>
            <span className="text-slate-200">{course.enrolledUsers?.length || 0} students</span>
          </div>
>>>>>>> 7fb58eb (Your commit message here)
        </div>
      </div>
    </div>
  );
};