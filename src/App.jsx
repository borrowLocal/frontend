import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Onboarding from './pages/Onboarding';
import AuthModal from './components/Modal';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="login" element={<AuthModal />} />
            <Route path="register" element={<AuthModal />} />
            <Route path="findPassword" element={<AuthModal />} />
            <Route path="resetPW" element={<AuthModal />} />
            <Route path="myPage" element={<AuthModal />} />
            <Route path="confirmPW" element={<AuthModal />} />
            <Route path="editProfile" element={<AuthModal />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
