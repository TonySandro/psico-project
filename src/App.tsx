import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import Catalog from './pages/catalog';
import AdminPage from './pages/admin';
import LanguageSwitcher from './components/LanguageSwitcher/LanguageSwitcher';

const App: React.FC = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
    </Router>
  );
};

export default App;
