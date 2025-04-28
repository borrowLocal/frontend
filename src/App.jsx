import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Onboarding from './pages/Onboarding';
import SideModal from './components/SideModal';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="login" element={<SideModal />} />
            <Route path="register" element={<SideModal />} />
            <Route path="findPassword" element={<SideModal />} />
            <Route path="resetPW" element={<SideModal />} />
            <Route path="myPage" element={<SideModal />} />
            <Route path="confirmPW" element={<SideModal />} />
            <Route path="editProfile" element={<SideModal />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
