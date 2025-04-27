import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AuthModal from './components/AuthModal';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<MainPage />}>
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
