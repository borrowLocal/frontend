import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './RequestModal.css';

const RentalRequest = ({ onClose, quantity, itemName }) => {
  const [rentalPeriod, setRentalPeriod] = useState({start: '', end: ''});
  const [rentalDateTime, setRentalDateTime] = useState({date: '', time: ''});
  const [returnDateTime, setReturnDateTime] = useState({date: '', time: ''});
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const { id } = useParams();

  const handleRentalPeriodChange = (type, value) => {
    setRentalPeriod(prev => ({...prev, [type]: value}));
  };

  const handleSubmit = async () => {
    setError('');

    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert('로그인이 필요합니다.');
        return;
      }

      if (!rentalPeriod.start || !rentalPeriod.end || !location || !rentalDateTime.time) {
        alert('모든 필드를 입력해주세요.');
        return;
      }

      const requestData = {
        item_id: parseInt(id),
        start_date: rentalPeriod.start,
        end_date: rentalPeriod.end,
        meeting_location: location,
        meeting_time: `${rentalDateTime.date}T${rentalDateTime.time}:00.000Z`,
        user_id: parseInt(userId),
        rental_quantity: parseInt(quantity),
        expected_return_at: returnDateTime.date
      };

      const response = await axios.post('http://localhost:8080/rentals', requestData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        alert('대여 신청이 완료되었습니다!');
        onClose();
      }

    } catch (err) {
      console.error('대여 신청에 실패했습니다:', err);
      alert(err.response.data);
      setError('대여 신청에 실패했습니다.');
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

      <button className="submit-button" onClick={handleSubmit}>대여 신청</button>
    </div>
  );
};

export default RentalRequest; 