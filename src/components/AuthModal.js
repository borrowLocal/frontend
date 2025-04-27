import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import FindPassword from './FindPassword';
import '../styles/LoginModal.css';

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
      </div>
    </div>
  );
};

export default AuthModal; 