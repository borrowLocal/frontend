import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RentalItemCard from "../cards/RentalItemCard";
import rentalData from "../../data/mockRentalData.json";

const RentalItemList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div>
      {rentalData.map((rental, index) => (
        <RentalItemCard
          key={index}
          {...rental}
          onPaymentClick={
            rental.status === "결제 요청"
              ? () => navigate('/payment')
              : undefined
          }
          onReviewClick={
            rental.status === "거래 완료"
              ? () => navigate('/reviewWrite', { state: { background: location.state?.background || location } })
              : undefined
          }
        />
      ))}
    </div>
  );
};

export default RentalItemList;
