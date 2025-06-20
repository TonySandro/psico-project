import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import PatientsPage from './pages/patients/PatientsPage';
import Dashboard from './pages/dashboard/Dashboard';
import MainLayout from './layouts/mainLayout';
import Home from './pages/home/Home';
import AvailableTestsPage from './pages/tests/AvailableTestsPage';
import FeedbackPage from './pages/feedback/Feedback';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/patients" element={<PatientsPage />} />
        <Route path="/tests" element={<AvailableTestsPage />} />
        <Route path="/docs" />
        <Route path="/feedback" element={<FeedbackPage/>} />
      </Route>
    </Routes>
  );
};

export default App;
