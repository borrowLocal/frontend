import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Login from './Auth/Login';
import Register from './Auth/Register';
import FindPassword from './Auth/FindPassword';
import MyPage from './MyMenu/MyPage';
import EditProfile from './MyMenu/EditProfile';
import '../styles/Modal.css';

const AuthModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isClosing, setIsClosing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsOpen(true);
    });
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setIsOpen(false);
    setTimeout(() => {
      navigate('/');
    }, 300);
  };

  return (
    <div 
      className={`modal-overlay ${isOpen ? 'open' : ''} ${isClosing ? 'closing' : ''}`} 
      onClick={handleClose}
    >
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={handleClose}>×</button>
        {location.pathname === '/login' && <Login onClose={handleClose} />}
        {location.pathname === '/register' && <Register onClose={handleClose} />}
        {location.pathname === '/findPassword' && <FindPassword onClose={handleClose} />}
        {location.pathname === '/myPage' && <MyPage onClose={handleClose} />}
        {location.pathname === '/editProfile' && <EditProfile onClose={handleClose} />}
      </div>
    </div>
  );
};

export default AuthModal; 