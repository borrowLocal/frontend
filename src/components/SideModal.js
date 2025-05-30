import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Login from './Auth/Login';
import Register from './Auth/Register';
import FindPassword from './Auth/FindPassword';
import ResetPW from './Auth/ResetPW';
import MyPage from './MyMenu/MyPage';
import ConfirmPW from './Auth/ConfirmPW';
import EditProfile from './Auth/EditProfile';
import RentalHistory from './MyMenu/RentalHistory/RentalHistory';
import ReviewList from './MyMenu/ReviewList/ReviewList';
import ReviewWrite from './MyMenu/ReviewWrite';
import '../styles/SideModal.css';

const SideModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isClosing, setIsClosing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsOpen(true);
    });
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleClose = () => {
    setIsClosing(true);
    setIsOpen(false);
    setTimeout(() => {
      navigate('/', { state: { background: location.state?.background || location } });
    }, 300);
  };

  return (
    <div 
      className={`modal-overlay ${isOpen ? 'open' : ''} ${isClosing ? 'closing' : ''}`} 
      onClick={handleClose}
    >
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="back-button" onClick={handleGoBack}>
          ◀ 뒤로가기
        </button>
        <button className="close-button" onClick={handleClose}>
          ×
        </button>
        {location.pathname === '/login' && <Login onClose={handleClose} />}
        {location.pathname === '/register' && <Register onClose={handleClose} />}
        {location.pathname === '/findPassword' && <FindPassword onClose={handleClose} />}
        {location.pathname === '/resetPW' && <ResetPW onClose={handleClose} />}
        {location.pathname === '/myPage' && <MyPage onClose={handleClose} />}
        {location.pathname === '/confirmPW' && <ConfirmPW onClose={handleClose} />}
        {location.pathname === '/editProfile' && <EditProfile onClose={handleClose} />}
        {location.pathname === '/rentalHistory' && <RentalHistory onClose={handleClose} />}
        {location.pathname === '/reviewList' && <ReviewList onClose={handleClose } />}
        {location.pathname === '/reviewWrite' && <ReviewWrite onClose={handleClose} />}
      </div>
    </div>
  );
};

export default SideModal; 