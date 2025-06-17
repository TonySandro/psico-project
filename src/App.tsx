import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import Dashboard from './pages/dashboard';
import MainLayout from './layouts/mainLayout';
import PatientsPage from './pages/patients/PatientsPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route element={<MainLayout />}> 
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tests" />
        <Route path="/patients" element={<PatientsPage />} />
        <Route path="/results" />
        <Route path="/subscription" />
        <Route path="/settings" />
      </Route>
    </Routes>
  );
};

export default App;
