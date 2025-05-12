import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisteredItemList from '../../ListComponents/RegisteredItemList';
import './RegisteredItem.css';

const RegisteredItem = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/registeredItem/register');
  };

  return (
    <div className='registered-item-container'>
      <div className="register-button-wrapper">
        <button className="register-item-button" onClick={handleRegisterClick}>
          물품 등록
        </button>
      </div>
      <div className="registered-item-view">
          <RegisteredItemList />
      </div>
    </div>
  );
};

export default RegisteredItem; 