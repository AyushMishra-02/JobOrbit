import React, { useContext, useEffect, useState } from 'react';
import { ApplicationContext } from '../context/ApplicationContext';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { Plus, BarChart2, Briefcase, CheckCircle, XCircle, Clock } from 'lucide-react';
import ApplicationForm from '../components/ApplicationForm';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { applications, stats, loading, fetchApplications, fetchStats, deleteApplication } = useContext(ApplicationContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState(null);

  useEffect(() => {
    fetchApplications();
    fetchStats();
  }, [fetchApplications, fetchStats]);

  const handleEdit = (app) => {
    setEditingApp(app);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingApp(null);
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Applied': return <Clock className="w-5 h-5 text-blue-500" />;
      case 'Interview': return <Briefcase className="w-5 h-5 text-purple-500" />;
      case 'Offer': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'Rejected': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Applied': return 'bg-blue-100 text-blue-800';
      case 'Interview': return 'bg-purple-100 text-purple-800';
      case 'Offer': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-600 mt-1">Track and manage your job applications.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            New Application
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {['Applied', 'Interview', 'Offer', 'Rejected'].map(status => {
            const stat = stats.find(s => s._id === status);
            return (
              <div key={status} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium text-slate-600">{status}</p>
                  {getStatusIcon(status)}
                </div>
                <p className="text-3xl font-bold text-slate-900 mt-4">{stat ? stat.count : 0}</p>
              </div>
            );
          })}
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-slate-500" />
              Recent Applications
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  <th className="px-6 py-4">Company & Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date Applied</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {applications.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-slate-500">
                      No applications found. Add one to get started!
                    </td>
                  </tr>
                ) : applications.map(app => (
                  <tr key={app._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{app.company}</div>
                      <div className="text-sm text-slate-500">{app.role}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {new Date(app.appliedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <button 
                        onClick={() => handleEdit(app)}
                        className="text-brand-600 hover:text-brand-900 mr-4 transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => deleteApplication(app._id)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {isModalOpen && (
        <ApplicationForm 
          onClose={closeModal} 
          existingApp={editingApp} 
        />
      )}
    </div>
  );
};

export default Dashboard;
