import React, { useState } from 'react';
import './RequestModal.css';

const Review = ({ onClose }) => {
  const [userName] = useState("성북구 헌터");

  const [ratings, setRatings] = useState({
    friendly: 0,
    punctual: 0,
    responsive: 0,
  });

  const handleRating = (type, score) => {
    setRatings(prev => ({
      ...prev,
      [type]: prev[type] === score ? 0 : score
    }));
  };  

  const renderStars = (currentRating, type) => {
    return [1, 2, 3].map((star) => (
      <span key={star} onClick={() => handleRating(type, star)}>
        {star <= currentRating ? '★' : '☆'}
      </span>
    ));
  };

  return (
    <div className="review-content">
      <div className="profile-section">
        <div className="profile-image"></div>
        <span>{userName}</span>님과의 거래 후기
      </div>

      <div className="review-rating">
        <div className="rating-item">
          <div>친절하고 매너가 좋아요</div>
          <div className="stars">
            {renderStars(ratings.friendly, 'friendly')}
          </div>
        </div>

        <div className="rating-item">
          <div>시간 약속을 잘 지켜요</div>
          <div className="stars">
            {renderStars(ratings.punctual, 'punctual')}
          </div>
        </div>

        <div className="rating-item">
          <div>응답이 빨라요</div>
          <div className="stars">
            {renderStars(ratings.responsive, 'responsive')}
          </div>
        </div>
      </div>

      <button className="submit-button">후기 등록</button>
    </div>
  );
};

export default Review;
