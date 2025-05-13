import React, { useState, useEffect } from 'react';
import './ProfileCard.css';

const mockData = {
  name: '성북구 헌터',
  trust: 8,
};

const ProfileCard = () => {
  const [name, setName] = useState('');
  const [trust, setTrust] = useState(0);

  useEffect(() => {
    setName(mockData.name);
    setTrust(mockData.trust);
  }, []);

  return (
    <div className="profile-card">
      <div className="profile-content">
        <img className="profile-image" />
        <div>
          <p className="profile-card-name"><strong>{name}</strong>님</p>
          <p className="profile-card-trust">신뢰도: ★ ({trust}/9)</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
