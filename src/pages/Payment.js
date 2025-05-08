import React from 'react';
import '../styles/Payment.css';

const Payment = () => {
  return (
    <div className="payment-container">
        <div className="payment-item">
            <h2>결제 하기</h2>
            <div className="item-title">
                <img src="https://via.placeholder.com/150" alt="상품 이미지" />
                <div className="item-info">
                    <h3>상품명</h3>
                    <p>상품 설명</p>
                    <p>가격: 10,000원</p>
                </div>
            </div>
            <div className="item-details">
                <div className="item-info">
                    <h3>상품명</h3>
                    <p>상품 설명</p>
                    <p>가격: 10,000원</p>
                </div>
            </div>
        </div>
        <div className="payment-card">
            <h3>카드 정보</h3>
            <form className="payment-form">
                <div className="form-group">
                    <label htmlFor="card-number">카드 번호</label>
                    <input type="text" id="card-number" placeholder="1234 5678 9012 3456" required />
                </div>
                <div className="form-group">
                    <label htmlFor="expiry-date">유효기간</label>
                    <input type="text" id="expiry-date" placeholder="MM/YY" required />
                </div>
                <div className="form-group">
                    <label htmlFor="cvv">CVV</label>
                    <input type="text" id="cvv" placeholder="123" required />
                </div>
                <button type="submit">결제하기</button>
            </form>
            <h3>카드 소유자 이름</h3>
            <form className="payment-form">
                <div className="form-group">
                    <label htmlFor="cardholder-name">이름</label>
                    <input type="text" id="cardholder-name" placeholder="홍길동" required />
                </div>
                <button type="submit">결제하기</button>
            </form>
            <h3>청구 주소</h3>
            <form className="payment-form">
                <div className="form-group">
                    <label htmlFor="billing-address">주소</label>
                    <input type="text" id="billing-address" placeholder="서울특별시 강남구" required />
                </div>
                <button type="submit">결제하기</button>
            </form>
        </div>
    </div>
  );
};

export default Payment;
