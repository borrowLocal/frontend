import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Onboarding from './pages/Onboarding';
import SideModal from './components/SideModal';
import RequestModal from './components/RequestModal/RequestModal';
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
            <Route path="rentalHistory" element={<SideModal />} />
            <Route path="reviewWrite" element={<SideModal />} />
            <Route path="rentalRequest" element={<RequestModal />} />
            <Route path="review" element={<RequestModal />} />
            <Route path="reportUser" element={<RequestModal />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
