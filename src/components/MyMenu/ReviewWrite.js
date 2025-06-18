import React, { useState } from 'react';
import axios from 'axios';
import '../RequestModal/RequestModal.css';

const ReviewWrite = ({ onClose, reviewData }) => {
  const [userName] = useState(reviewData?.nickname);
  const [reportMessage, setReportMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  const handleSubmitReview = async () => {
    try {
      const totalRating = ratings.friendly + ratings.punctual + ratings.responsive;
      
      const requestBody = {
        rental_id: reviewData?.rentalId || 0,
        user_target_id: reviewData?.targetUserId || 0,
        content: reportMessage,
        rating: totalRating
      };

      const userId = localStorage.getItem('userId');
      if (!userId) {
        setError('로그인이 필요합니다.');
        setLoading(false);
        return;
      }

      await axios.post('http://localhost:8080/reviews', requestBody, {
        params: {
          user_id: userId
        },
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('후기가 성공적으로 등록되었습니다.');
      onClose();
    } catch (error) {
      const messages = error.response.data.errors.map(err => err.message).join('\n');
      alert(messages);
    }
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

      <input
        type="textarea"
        className='reportUser-input'
        value={reportMessage}
        onChange={(e) => setReportMessage(e.target.value)}
       />

      <button className="submit-button" onClick={handleSubmitReview}>후기 등록</button>
    </div>
  );
};

export default ReviewWrite;
