import React, { useEffect, useState } from 'react';
import { MapPin, DollarSign, Clock, Search, Sparkles, TrendingUp, Brain } from 'lucide-react';
import { Job } from '../types';
import { useToast } from '../components/ToastContext';
import { jobService } from '../src/services/api';

export const Jobs: React.FC = () => {
  const { addToast } = useToast();
  const [jobs, setJobs] = useState<(Job & { matchScore?: number })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await jobService.getJobs();
        // Add mock match score for now as backend doesn't calculate it yet
        const jobsWithScore = response.data.map((job: Job) => ({
          ...job,
          matchScore: Math.floor(Math.random() * (99 - 70 + 1) + 70)
        }));
        setJobs(jobsWithScore);
      } catch (error) {
        addToast('Failed to load jobs', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [addToast]);

  const handleApply = async (jobId: string, jobTitle: string) => {
    try {
      await jobService.applyToJob(jobId);
      addToast(`Successfully applied to ${jobTitle}!`, 'success');
    } catch (error: any) {
      if (error.response?.status === 401) {
        addToast('Please login to apply for jobs', 'error');
      } else if (error.response?.data?.message) {
        addToast(error.response.data.message, 'error');
      } else {
        addToast('Failed to apply. Please try again.', 'error');
      }
    }
  };

  if (loading) {
    return <div className="text-white text-center mt-20">Loading jobs...</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
      {/* Sidebar Filters */}
      <div className="w-full lg:w-72 space-y-8 flex-shrink-0">

        {/* Salary Predictor Widget (NEW) */}
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl p-6 border border-indigo-500/30 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <DollarSign size={80} />
          </div>
          <div className="relative z-10">
            <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              <Brain size={18} className="text-indigo-400" /> Salary Predictor
            </h3>
            <p className="text-xs text-indigo-200 mb-4">Based on your skills & exp.</p>

            <div className="text-center bg-slate-900/50 rounded-xl p-3 mb-4 border border-indigo-500/20">
              <p className="text-slate-400 text-xs">Estimated Market Value</p>
              <p className="text-2xl font-bold text-white">$125,000</p>
              <p className="text-xs text-green-400 flex items-center justify-center gap-1">
                <TrendingUp size={12} /> +15% vs avg
              </p>
            </div>

            <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-2 rounded-lg transition-colors">
              View Full Report
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-blue-400 font-semibold mb-4 text-lg">Job Type</h3>
          <div className="space-y-3">
            {['Full-time', 'Internship', 'Remote', 'Contract'].map(type => (
              <label key={type} className="flex items-center gap-3 text-slate-300 cursor-pointer hover:text-white">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-900" />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-blue-400 font-semibold mb-4 text-lg">Salary Range</h3>
          <input type="range" className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />
          <div className="flex justify-between text-xs text-slate-400 mt-2">
            <span>$30k</span>
            <span>$200k+</span>
          </div>
        </div>

        <div>
          <h3 className="text-blue-400 font-semibold mb-4 text-lg">Skill Tags</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
            <input type="text" placeholder="Search skills..." className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 pl-9 pr-3 text-sm text-slate-300 focus:outline-none focus:border-blue-500" />
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {['React', 'Python', 'UI/UX'].map(tag => (
              <span key={tag} className="bg-slate-800 text-slate-400 text-xs px-3 py-1 rounded-full border border-slate-700">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Jobs & Internships</h2>
          <span className="text-slate-400 text-sm">{jobs.length} results found</span>
        </div>

        {jobs.length === 0 ? (
          <div className="text-slate-400 text-center py-10">No jobs found. Check back later!</div>
        ) : (
          <>
            {/* Featured Cards (Top Row) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {jobs.slice(0, 2).map(job => (
                <div key={job.id} className="bg-slate-800/50 border border-blue-500/30 rounded-2xl p-6 relative overflow-hidden group hover:bg-slate-800 transition-all">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-green-400"></div>
                  {/* AI Match Badge */}
                  <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md px-2 py-1 rounded-lg border border-indigo-500/30 flex items-center gap-1">
                    <Sparkles size={12} className="text-indigo-400" />
                    <span className="text-xs font-bold text-indigo-200">{job.matchScore}% Match</span>
                  </div>

                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-2">
                      <img src={job.logo || 'https://via.placeholder.com/50'} alt={job.company} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg leading-tight">{job.title}</h3>
                      <p className="text-slate-400 text-sm">{job.company}</p>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                    Join our team to build scalable systems. We are looking for talented individuals.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {job.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-slate-700 rounded-md text-xs text-slate-300">{tag}</span>
                    ))}
                  </div>
                  <button
                    onClick={() => handleApply(String(job._id || job.id), job.title)}
                    className="w-full bg-slate-700 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition-colors"
                  >
                    Apply Now
                  </button>
                </div>
              ))}
            </div>

            {/* Standard List */}
            <div className="space-y-4">
              {jobs.slice(2).map(job => (
                <div key={job.id} className="bg-slate-800 border border-slate-700 rounded-xl p-6 flex flex-col md:flex-row md:items-center gap-6 hover:border-slate-600 transition-colors relative">

                  {/* AI Match Badge Small */}
                  <div className="absolute top-2 right-2 md:hidden bg-slate-900/50 px-2 py-0.5 rounded text-[10px] text-indigo-300 border border-indigo-500/20">
                    {job.matchScore}% Match
                  </div>

                  <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center p-3 flex-shrink-0">
                    <img src={job.logo || 'https://via.placeholder.com/50'} alt={job.company} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg">{job.title}</h3>
                      <span className={`hidden md:flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border ${(job.matchScore || 0) > 80 ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                        }`}>
                        <Sparkles size={10} /> {job.matchScore}% AI Match
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm mb-2">{job.company} • {job.location}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 text-xs text-blue-400 bg-blue-400/10 px-2 py-1 rounded">
                        <Clock size={12} /> {job.type}
                      </span>
                      {job.tags.map(tag => (
                        <span key={tag} className="text-xs text-slate-400 bg-slate-700/50 px-2 py-1 rounded">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3 flex-shrink-0">
                    <span className="text-green-400 font-bold">{job.salary}</span>
                    <button
                      onClick={() => handleApply(String(job._id || job.id), job.title)}
                      className="bg-[#a3e635] text-slate-900 px-6 py-2 rounded-lg font-bold hover:bg-[#bef264] transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};