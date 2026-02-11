import React, { useEffect, useState } from 'react';
import { PlayCircle, Clock, BookOpen, Star, MoreVertical, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/ToastContext';
import { courseService } from '../src/services/api';

export const Courses: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await courseService.getCourses();
        setCourses(response.data);
      } catch (error) {
        addToast('Failed to load courses', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [addToast]);

  const handleEnroll = async (courseId: string, title: string) => {
    try {
      await courseService.enrollInCourse(courseId);
      addToast(`Enrolled in ${title}!`, 'success');
    } catch (error: any) {
      if (error.response?.status === 401) {
        addToast('Please login to enroll', 'error');
      } else if (error.response?.data?.message) {
        addToast(error.response.data.message, 'error');
      } else {
        addToast('Enrollment failed. Please try again.', 'error');
      }
    }
  };

  const handleResume = (id: number) => {
    navigate(`/lesson/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-10">

      {/* Welcome & Featured Section */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-800 border border-slate-700 min-h-[350px] flex md:flex-row flex-col">
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative z-10">
          <span className="text-blue-400 font-bold tracking-wider text-sm mb-2 uppercase">Continue Learning</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">Mastering System Design: Scalability & Performance</h1>
          <p className="text-slate-400 mb-6">Dive deep into architectural patterns, database scaling, and distributed systems with our comprehensive advanced course.</p>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex -space-x-2">
              <img className="w-8 h-8 rounded-full border-2 border-slate-800" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" alt="Inst" />
              <img className="w-8 h-8 rounded-full border-2 border-slate-800" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80" alt="Inst" />
              <div className="w-8 h-8 rounded-full border-2 border-slate-800 bg-slate-700 flex items-center justify-center text-[10px] text-white font-bold">+5k</div>
            </div>
            <span className="text-sm text-slate-400">students enrolled</span>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-white font-medium">Progress</span>
              <span className="text-blue-400 font-bold">65%</span>
            </div>
            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
              <div className="w-[65%] h-full bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
            </div>
            <button
              onClick={() => handleResume(1)}
              className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors flex items-center gap-2 w-fit mt-2"
            >
              <PlayCircle size={20} fill="currentColor" className="text-blue-600" />
              Resume Lesson
            </button>
          </div>
        </div>
        <div className="md:w-1/2 relative h-64 md:h-auto">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            className="absolute inset-0 w-full h-full object-cover"
            alt="Course Cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-800/50 to-transparent md:bg-gradient-to-l"></div>
        </div>
      </div>

      {/* Filters & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Browse Courses</h2>
          <p className="text-slate-400 text-sm">Expand your knowledge with top-rated courses</p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          {['All Courses', 'Design', 'Development', 'Business', 'Marketing'].map((filter, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${i === 0 ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-3 text-center text-slate-400">Loading courses...</div>
        ) : courses.length > 0 ? (
          courses.map((course, idx) => (
            <div key={idx} className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden group hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all duration-300 flex flex-col h-full">
              {/* Image Container */}
              <div className="h-48 relative overflow-hidden">
                <img
                  src={course.image || 'https://via.placeholder.com/300'}
                  alt={course.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>

                <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm p-1.5 rounded-lg text-slate-300 hover:text-white cursor-pointer">
                  <MoreVertical size={16} />
                </div>

                <div className="absolute bottom-3 left-3 flex gap-2">
                  <span className="px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-md bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    {course.level || 'Beginner'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center text-xs text-white">
                      {course.instructor ? course.instructor.charAt(0) : 'I'}
                    </div>
                    <span className="text-xs text-slate-400 font-medium">{course.instructor || 'Instructor'}</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400 text-xs font-bold">
                    <Star size={12} fill="currentColor" /> {course.rating || 4.5}
                  </div>
                </div>

                <h3 className="font-bold text-lg mb-2 text-white group-hover:text-blue-400 transition-colors line-clamp-2">{course.title}</h3>

                <div className="flex items-center gap-4 text-xs text-slate-500 mb-4 mt-auto">
                  <span className="flex items-center gap-1"><Clock size={14} /> {course.hours || '10h'}</span>
                  <span className="flex items-center gap-1"><BookOpen size={14} /> {course.students || 0} students</span>
                </div>

                <button
                  onClick={() => handleEnroll(course._id, course.title)}
                  className="w-full mt-2 bg-slate-700/50 hover:bg-blue-600 text-slate-300 hover:text-white py-2.5 rounded-xl text-sm font-bold transition-all border border-slate-700 hover:border-blue-500"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-slate-800 border border-slate-700 rounded-2xl p-12 text-center">
            <p className="text-slate-400 text-lg">No courses available yet.</p>
            <p className="text-slate-500 text-sm mt-2">Check back later for new courses!</p>
          </div>
        )}
      </div>
    </div>
  );
};