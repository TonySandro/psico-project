import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import Catalog from './pages/catalog';
import MainLayout from './layouts/mainLayout';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route element={<MainLayout />}>
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/dashboard" />
        <Route path="/tests" />
        <Route path="/patients" />
        <Route path="/results" />
        <Route path="/subscription" />
        <Route path="/settings" />
      </Route>
    </Routes>
  );
};

export default App;
