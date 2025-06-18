import React, { useState, useEffect } from 'react';
import RentalRequest from './RentalRequest';
import ReviewWrite from '../MyMenu/ReviewWrite';
import ReportUser from './ReportUser';
import './RequestModal.css';

const RequestModal = ({ onClose, type, quantity, reviewData, reportData }) => {
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
      onClose();
    }, 300);
  };

  const renderContent = () => {
    switch (type) {
      case 'rental':
        return <RentalRequest onClose={handleClose} quantity={quantity} />;
      case 'review':
        return <ReviewWrite onClose={handleClose} reviewData={reviewData} />;
      case 'report':
        return <ReportUser onClose={handleClose} reportData={reportData} />;
      default:
        return null;
    }
  };

  return (
    <div 
      className={`request-modal-overlay ${isOpen ? 'open' : ''} ${isClosing ? 'closing' : ''}`} 
      onClick={handleClose}
    >
      <div className="request-modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={handleClose}>×</button>
        {renderContent()}
      </div>
    </div>
  );
};

export default RequestModal; 