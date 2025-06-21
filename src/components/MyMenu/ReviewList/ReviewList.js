import React, { useState, useEffect } from 'react';
import ReviewCardList from '../../lists/ReviewCardList';
import axios from 'axios';
import './ReviewList.css';

const ReviewList = ({ onClose }) => {
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState('received');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setError('로그인이 필요합니다.');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:8080/users/${userId}`);
        setUserName(response.data.nick_name || '');
        setError('');
      } catch (err) {
        setError('유저 정보를 불러오지 못했습니다.');
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <div className="review-list-view">
      <h2><span>{userName}</span>님</h2>
      {error && <div className="error-message">{error}</div>}

      <div className="review-tabs">
        <button
          className={activeTab === 'received' ? 'active' : ''}
          onClick={() => setActiveTab('received')}
        >
          받은 후기
        </button>
        <button
          className={activeTab === 'written' ? 'active' : ''}
          onClick={() => setActiveTab('written')}
        >
          작성후기
        </button>

        <div
          className="indicator"
          style={{ transform: activeTab === 'received' ? 'translateX(0%)' : 'translateX(100%)', }}
        />
      </div>

      <ReviewCardList type={activeTab} />
    </div>
  );
};

export default ReviewList;
