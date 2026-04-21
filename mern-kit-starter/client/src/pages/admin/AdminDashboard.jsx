import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import Loader from '../../components/Loader';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { adminData, loading } = useSelector((state) => state.admin);
  const [metrics, setMetrics] = useState({
    usersCount: 0,
    activeSessions: 0,
    pendingTasks: 0
  });

  useEffect(() => {
    // dispatch(fetchAdminData());
  }, [dispatch]);

  useEffect(() => {
    if (adminData) {
      setMetrics({
        usersCount: adminData.usersCount || 0,
        activeSessions: adminData.activeSessions || 0,
        pendingTasks: adminData.pendingTasks || 0
      });
    }
  }, [adminData]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={`min-h-screen p-8 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard theme={theme} label="Total Users" value={metrics.usersCount} />
        <MetricCard theme={theme} label="Active Sessions" value={metrics.activeSessions} />
        <MetricCard theme={theme} label="Pending Tasks" value={metrics.pendingTasks} />
      </div>

      {/* Actions Section */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <DashboardButton theme={theme} label="Manage Users" color="blue" onClick={() => navigate('/getAllUsers')} />
        <DashboardButton theme={theme} label="All Tickets" color="green" onClick={() => navigate('/getAllTickets')} />
        <DashboardButton theme={theme} label="All Messages" color="indigo" onClick={() => navigate('/getAllMessages')} />
      </div>
    </div>
  );
};

// Reusable metric card component with theme support
const MetricCard = ({ label, value, theme }) => (
  <div className={`p-6 shadow rounded-lg text-center ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
    <h3 className="text-lg font-semibold">{label}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

// Reusable dashboard button component with theme support
const DashboardButton = ({ label, color, onClick, theme }) => {
  return (
    <button
      onClick={onClick}
      className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
    >
      {label}
    </button>
  );
};

export default AdminDashboard;
