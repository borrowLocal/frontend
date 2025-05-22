import React from "react";
import { useNavigate } from "react-router-dom";
import RentalItemCard from "../cards/RentalItemCard";
import rentalData from "../../data/mockRentalData.json";

const RentalItemList = () => {
  const navigate = useNavigate();

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
              ? () => navigate('/reviewWrite')
              : undefined
          }
        />
      ))}
    </div>
  );
};

export default RentalItemList;
