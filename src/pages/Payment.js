import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import '../styles/Payment.css';

const Payment = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [agreed, setAgreed] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        if (!id) {
          setError('대여 ID가 필요합니다.');
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:8080/rentals/payments/${id}`);
        setPaymentData(response.data);
      } catch (err) {
        console.error('결제 정보를 가져오는데 실패했습니다:', err);
        setError('결제 정보를 가져오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentData();
  }, [id]);

  const paymentSubmit = async (e) => {
    e.preventDefault();

    if (!agreed) {
        alert('결제에 동의해야 결제가 가능합니다.');
        return;
    }

    try {
        const response = await axios.put(`http://localhost:8080/rentals/status/start/${id}`);
      if (response.status === 200) {
        alert('결제가 완료되었습니다!');
        navigate('/rentalHistory');
      }
    } catch (err) {
      console.error('결제를 요청하는데 실패했습니다:', err);
      setError('결제를 요청하는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error || !paymentData) return <div>{error}</div>;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const dayName = days[date.getDay()];
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}(${dayName})`;
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const dayName = days[date.getDay()];
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}(${dayName}) ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
  };
      
  return (
    <div className="payment-main-container">
        <div className="payment-container">
            <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            <div className="payment-item">
                <div className="item-title">
                    <img src="" />
                    <div className="item-info">
                        <p className="owner">{paymentData.renterNickName}님의</p>
                        <h3>{paymentData.itemTitle}</h3>
                        <p className="price-highlight">{paymentData.totalAmount.toLocaleString()}원</p>
                        <p className="price-sub">{paymentData.pricePerDay.toLocaleString()}원/일 (보증금 {paymentData.depositAmount.toLocaleString()}원)</p>
                    </div>
                </div>

                <div className="item-details">
                    <div className="detail-row">
                        <span>수량</span>
                        <span>{paymentData.rentalQuantity}개</span>
                    </div>
                    <div className="detail-row">
                        <span>대여 기간</span>
                        <span>{formatDate(paymentData.startDate)} ~ {formatDate(paymentData.endDate)}</span>
                    </div>
                    <div className="detail-row">
                        <span>대여 일시</span>
                        <span>{formatDateTime(paymentData.meetingTime)}</span>
                    </div>
                    <div className="detail-row">
                        <span>반납 일시</span>
                        <span>{formatDate(paymentData.exceptedReturnAt)}</span>
                    </div>
                    <div className="detail-row">
                        <span>거래 장소</span>
                        <span>{paymentData.meetingLocation}</span>
                    </div>
                </div>
            </div>

            <div className="payment-card">
                <h3>카드 정보</h3>
                <form className="payment-form" onSubmit={paymentSubmit}>
                    <input type="text" id="card-number" placeholder="1234 1234 1234 1234" required />
                    <div className="form-inline">
                        <input type="text" placeholder="MM/YY" required />
                        <input type="text" placeholder="보안 코드(CVC)" required />
                    </div>

                <h3>카드 소유자 이름</h3>
                <input type="text" id="cardholder-name" placeholder="성명" required />

                <h3>청구 주소</h3>
                <div className="address-form-input">
                    <input type="text" value="대한민국" readOnly />
                    <input type="text" placeholder="도시" required />
                    <input type="text" placeholder="시" required />
                    <input type="text" placeholder="읍/면/동" required />
                    <input type="text" placeholder="주소란 1" required />
                    <input type="text" placeholder="주소란 2" />
                    <input type="text" placeholder="우편번호" required />
                </div>

                <div className="form-check">
                    <input
                    type="checkbox"
                    id="agree"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    />
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
