import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import Catalog from './pages/catalog';

const App: React.FC = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/catalog" element={<Catalog />} />
        </Routes>
    </Router>
  );
};

export default App;
