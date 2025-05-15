import React, { useState, useEffect } from 'react';
import './ProfileCard.css';

const mockData = {
  nickName: '성북구 헌터',
  rating: 8,
};

const ProfileCard = () => {
  const [nickName, setNickName] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setNickName(mockData.nickName);
    setRating(mockData.rating);
  }, []);

  return (
    <div className="profile-card">
      <div className="profile-content">
        <img className="profile-image" />
        <div>
          <p className="profile-card-name"><strong>{nickName}</strong>님</p>
          <p className="profile-card-trust">신뢰도: ★ ({rating}/9)</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
