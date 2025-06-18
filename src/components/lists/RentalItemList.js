import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import RentalItemCard from "../cards/RentalItemCard";

const RentalItemList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [rentalData, setRentalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRentalData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          setError('로그인이 필요합니다.');
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:8080/rentals/status/${userId}`);
        setRentalData(response.data);
      } catch (err) {
        console.error('대여 목록을 가져오는데 실패했습니다:', err);
        setError('대여 목록을 가져오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchRentalData();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {rentalData.map((rental, index) => (
        <RentalItemCard
          key={rental.rental_id || index}
          itemName={rental.item_title}
          status={rental.rental_status}
          requestDate={rental.start_date}
          rentPeriod={`${rental.start_date} ~ ${rental.end_date}`}
          returnDate={rental.end_date}
          depositAmount={rental.deposit_amount}
          onPaymentClick={
            rental.rental_status === "결제요청"
              ? () => navigate('/payment')
              : undefined
          }
          onReviewClick={
            rental.rental_status === "대여완료"
              ? () => navigate('/reviewWrite', { state: { background: location.state?.background || location } })
              : undefined
          }
        />
      ))}
    </div>
  );
};

export default RentalItemList;
