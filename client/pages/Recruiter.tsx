import React, { useState, useEffect } from 'react';
import { Briefcase, Users, Search, Filter, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/ToastContext';
import { jobService } from '../src/services/api';

export const Recruiter: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await jobService.getJobs();
        setJobs(res.data);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto flex justify-center py-20">
        <Loader className="animate-spin text-blue-400" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Recruiter Dashboard</h1>
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input type="text" placeholder="Search jobs..." className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500 text-slate-200" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-blue-500/20 text-blue-400 rounded-lg"><Briefcase size={24} /></div>
          <div>
            <p className="text-slate-400 text-sm">Total Jobs</p>
            <h3 className="text-2xl font-bold">{jobs.length}</h3>
          </div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-green-500/20 text-green-400 rounded-lg"><Users size={24} /></div>
          <div>
            <p className="text-slate-400 text-sm">Total Applicants</p>
            <h3 className="text-2xl font-bold">{jobs.reduce((sum: number, j: any) => sum + (j.applicants?.length || 0), 0)}</h3>
          </div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-purple-500/20 text-purple-400 rounded-lg"><Filter size={24} /></div>
          <div>
            <p className="text-slate-400 text-sm">Active Jobs</p>
            <h3 className="text-2xl font-bold">{jobs.filter((j: any) => j.active !== false).length}</h3>
          </div>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold">Job Postings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-900/50 text-slate-400 text-sm">
              <tr>
                <th className="p-4">Job Title</th>
                <th className="p-4">Company</th>
                <th className="p-4">Location</th>
                <th className="p-4">Applicants</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {jobs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">No jobs posted yet</td>
                </tr>
              ) : (
                jobs.map((job: any) => (
                  <tr key={job._id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="p-4 font-medium">{job.title}</td>
                    <td className="p-4 text-slate-400">{job.company}</td>
                    <td className="p-4 text-slate-400">{job.location}</td>
                    <td className="p-4">
                      <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full text-xs font-bold">{job.applicants?.length || 0}</span>
                    </td>
                    <td className="p-4">
                      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold">Active</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};