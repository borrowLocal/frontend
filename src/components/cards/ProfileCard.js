import React from 'react';
import './styles/ProfileCard.css';

const ProfileCard = ({ ownerData }) => {
  return (
    <div className="profile-card">
      <div className="profile-content">
        <img className="profile-image" />
        <div>
          <p className="profile-card-name"><strong>{ownerData.owner_nick_name}</strong>님</p>
          <p className="profile-card-trust">신뢰도: ★ ({ownerData.owner_rating}/9)</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
