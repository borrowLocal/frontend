import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ItemRegister.css';

const ItemRegister = ({ onCancel }) => {
  const navigate = useNavigate();

  return (
    <div className="item-register-container">
        <div className="form-buttons">
            <button className="register-cancel-button" onClick={() => navigate('/registeredItem')}>
                취소
            </button>
            <button className="register-submit-button">등록</button>
        </div>

        <div className="item-register-main">
            <div className="item-register-image">
                <img />
            </div>

            <div className="item-register-form">
                <input type="text" placeholder="물품 명" />

                <div className="row-inputs">
                    <input type="text" placeholder="대여비 (/일)" />
                    <input type="text" placeholder="보증금" />
                </div>

                <input type="number" placeholder="대여 가능 수량" />

                <textarea placeholder="설명" rows="5" />
            </div>     
        </div>
    </div>
  );
};

export default ItemRegister;
