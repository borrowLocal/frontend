import React, { useState } from 'react';
import './RequestModal.css';

const RentalRequest = ({ onClose, quantity }) => {
  const [itemName, setItemName] = useState('텐트');
  const [rentalPeriod, setRentalPeriod] = useState({start: '', end: ''});
  const [rentalDateTime, setRentalDateTime] = useState({date: '', time: ''});
  const [returnDateTime, setReturnDateTime] = useState({date: '', time: ''});
  const [location, setLocation] = useState('');

  const handleRentalPeriodChange = (type, value) => {
    setRentalPeriod(prev => ({...prev, [type]: value}));
    
    if (type === 'start') {
      setRentalDateTime(prev => ({...prev, date: value}));
    } else if (type === 'end') {
      setReturnDateTime(prev => ({...prev, date: value}));
    }
  };

  return (
    <div className="rental-request-content">
      <h4>{itemName} 대여</h4>
      <div className='descriptInput'>수량</div>
      <input
        type="text"
        value={quantity}
        readOnly
        className="quantity-input"
      />

      <div className='descriptInput'>대여 기간</div>
      <div className="date-input-group">
        <input 
          type="date" 
          value={rentalPeriod.start} 
          onChange={(e) => handleRentalPeriodChange('start', e.target.value)} 
        />
        ~
        <input 
          type="date" 
          value={rentalPeriod.end} 
          onChange={(e) => handleRentalPeriodChange('end', e.target.value)} 
        />
      </div>

      <div className='descriptInput'>대여 희망 일시</div>
      <div className="date-input-group">
        <input 
          type="date" 
          value={rentalDateTime.date} 
          onChange={(e) => setRentalDateTime(prev => ({...prev, date: e.target.value}))} 
          readOnly
        />
        <input 
          type="time" 
          value={rentalDateTime.time} 
          onChange={(e) => setRentalDateTime(prev => ({...prev, time: e.target.value}))} 
        />
      </div>

      <div className='descriptInput'>반납 희망 일시</div>
      <div className="date-input-group">
        <input 
          type="date" 
          value={returnDateTime.date} 
          onChange={(e) => setReturnDateTime(prev => ({...prev, date: e.target.value}))} 
          readOnly
        />
        <input 
          type="time" 
          value={returnDateTime.time} 
          onChange={(e) => setReturnDateTime(prev => ({...prev, time: e.target.value}))} 
        />
      </div>

      <div className='descriptInput'>거래 희망 장소</div>
      <input
        type="text"
        placeholder="예) 월곡역 3번 출구"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="location-input"
      />

      <button className="submit-button">대여 신청</button>
    </div>
  );
};

export default RentalRequest; 