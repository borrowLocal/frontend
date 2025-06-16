import React, { useState } from 'react';
import Header from '../components/Header';
import paymentData from '../data/mockPaymentData.json';
import '../styles/Payment.css';

const Payment = () => {
  const [searchQuery, setSearchQuery] = useState('');
      
  return (
    <div className="payment-main-container">
        <div className="payment-container">
            <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            <div className="payment-item">
                <div className="item-title">
                    <img src="" />
                    <div className="item-info">
                        <p className="owner">{paymentData.owner}님의</p>
                        <h3>{paymentData.itemName}</h3>
                        <p className="price-highlight">{paymentData.price}</p>
                        <p className="price-sub">{paymentData.priceDetail}</p>
                    </div>
                </div>

                <div className="item-details">
                    <div className="detail-row">
                        <span>수량</span>
                        <span>{paymentData.quantity}</span>
                    </div>
                    <div className="detail-row">
                        <span>대여 기간</span>
                        <span>{paymentData.rentalPeriod}</span>
                    </div>
                    <div className="detail-row">
                        <span>대여 일시</span>
                        <span>{paymentData.rentalDateTime}</span>
                    </div>
                    <div className="detail-row">
                        <span>반납 일시</span>
                        <span>{paymentData.returnDateTime}</span>
                    </div>
                    <div className="detail-row">
                        <span>거래 장소</span>
                        <span>{paymentData.location}</span>
                    </div>
                </div>
            </div>

            <div className="payment-card">
                <h3>카드 정보</h3>
                <form className="payment-form">
                    <input type="text" id="card-number" placeholder="1234 1234 1234 1234" required />
                    <div className="form-inline">
                        <input type="text" placeholder="MM/YY" required />
                        <input type="text" placeholder="보안 코드(CVC)" required />
                    </div>
                </form>

                <h3>카드 소유자 이름</h3>
                <input type="text" id="cardholder-name" placeholder="성명" required />

                <h3>청구 주소</h3>
                <form className="payment-form">
                <div className="address-form-input">
                    <select required>
                    <option value="">대한민국</option>
                    </select>
                    <select required>
                    <option value="">도시</option>
                    </select>
                    <input type="text" placeholder="시" required />
                    <input type="text" placeholder="읍/면/동" required />
                    <input type="text" placeholder="주소란 1" required />
                    <input type="text" placeholder="주소란 2" />
                    <input type="text" placeholder="우편번호" required />
                </div>

                <div className="form-check">
                    <input type="checkbox" id="agree" />
                    <span>결제 동의</span>
                </div>

                <button type="submit" className='payment-submit-button'>결제하기</button>
                </form>
            </div>
        </div>
    </div>
  );
};

export default Payment;
