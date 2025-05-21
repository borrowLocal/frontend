import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import RentalRequest from './RentalRequest';
import ReviewWrite from '../MyMenu/ReviewWrite';
import ReportUser from './ReportUser';
import './RequestModal.css';

const RequestModal = () => {
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
      className={`request-modal-overlay ${isOpen ? 'open' : ''} ${isClosing ? 'closing' : ''}`} 
      onClick={handleClose}
    >
      <div className="request-modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={handleClose}>×</button>
        {location.pathname === '/rentalRequest' && <RentalRequest onClose={handleClose} />}
        {location.pathname === '/review' && <ReviewWrite onClose={handleClose} />}
        {location.pathname === '/reportUser' && <ReportUser onClose={handleClose} />}
      </div>
    </div>
  );
};

export default RequestModal; 