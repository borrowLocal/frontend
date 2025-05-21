import React, { useState } from 'react';
import ReviewCardList from '../../lists/ReviewCardList';
import './ReviewList.css';

const ReviewList = ({ onClose }) => {
  const [userName, setUserName] = useState('여의도 주술사');
  const [activeTab, setActiveTab] = useState('received');

  return (
    <div className="review-list-view">
      <h2><span>{userName}</span>님</h2>

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
