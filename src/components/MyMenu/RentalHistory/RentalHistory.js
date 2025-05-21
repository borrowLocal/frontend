import React, { useState } from 'react';
import RentalItemList from '../../lists/RentalItemList';
import './RentalHistory.css';

const RentalHistory = ({ onClose }) => {
  const [userName, setUserName] = useState('여의도 주술사');

  return (
    <div className="rental-history-view">
        <h2><span>{userName}</span>님<br/>대여내역</h2>
        <RentalItemList />
    </div>
  );
};

export default RentalHistory; 