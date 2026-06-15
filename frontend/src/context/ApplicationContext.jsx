import React, { createContext, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const ApplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const getAuthConfig = () => ({
    headers: { Authorization: `Bearer ${user?.token}` }
  });

  const fetchApplications = useCallback(async (statusFilter = '', sortOption = '') => {
    if (!user) return;
    setLoading(true);
    try {
      let url = 'http://localhost:5000/api/applications';
      const params = new URLSearchParams();
      if (statusFilter) params.append('status', statusFilter);
      if (sortOption) params.append('sort', sortOption);
      if (params.toString()) url += `?${params.toString()}`;

      const { data } = await axios.get(url, getAuthConfig());
      setApplications(data);
    } catch (error) {
      console.error('Failed to fetch applications', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const fetchStats = useCallback(async () => {
    if (!user) return;
    try {
      const { data } = await axios.get('http://localhost:5000/api/applications/stats/summary', getAuthConfig());
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats', error);
    }
  }, [user]);

  const createApplication = async (appData) => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/applications', appData, getAuthConfig());
      setApplications(prev => [data, ...prev]);
      fetchStats();
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to create' };
    }
  };

  const updateApplication = async (id, appData) => {
    try {
      const { data } = await axios.put(`http://localhost:5000/api/applications/${id}`, appData, getAuthConfig());
      setApplications(prev => prev.map(app => app._id === id ? data : app));
      fetchStats();
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to update' };
    }
  };

  const deleteApplication = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/applications/${id}`, getAuthConfig());
      setApplications(prev => prev.filter(app => app._id !== id));
      fetchStats();
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Failed to delete' };
    }
  };

  return (
    <ApplicationContext.Provider value={{
      applications, stats, loading, fetchApplications, fetchStats,
      createApplication, updateApplication, deleteApplication
    }}>
      {children}
    </ApplicationContext.Provider>
  );
};
