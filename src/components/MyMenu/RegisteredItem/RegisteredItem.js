import React from 'react';
import RegisteredItemList from '../../ListComponents/RegisteredItemList';
import './RegisteredItem.css';

const RegisteredItem = ({ onClose }) => {
  return (
    <div className='registered-item-container'>
      <div className="register-button-wrapper">
        <button className="register-item-button" onClick={onClose}>물품 등록</button>
      </div>
      <div className="registered-item-view">
          <RegisteredItemList />
      </div>
    </div>
  );
};

export default RegisteredItem; 