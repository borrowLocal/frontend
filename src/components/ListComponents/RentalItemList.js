import React from "react";
import RentalItemCard from "../CardComponents/RentalItemCard";
import rentalData from "../../data/mockRentalData.json";

const RentalItemList = () => {
  return (
    <div>
      {rentalData.map((rental, index) => (
        <RentalItemCard
          key={index}
          {...rental}
          onPaymentClick={
            rental.status === "결제 요청"
              ? () => alert("결제 페이지로 이동")
              : undefined
          }
          onReviewClick={
            rental.status === "거래 완료"
              ? () => alert("후기 작성 페이지로 이동")
              : undefined
          }
        />
      ))}
    </div>
  );
};

export default RentalItemList;
