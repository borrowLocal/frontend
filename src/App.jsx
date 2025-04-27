import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Onboarding from './pages/Onboarding';
import AuthModal from './components/AuthModal';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Onboarding />}>
            <Route path="login" element={<AuthModal />} />
            <Route path="register" element={<AuthModal />} />
            <Route path="findPassword" element={<AuthModal />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
