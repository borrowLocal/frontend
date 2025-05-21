import { useNavigate } from "react-router-dom";
import "./styles/RentalItemCard.css";

const RentalItemCard = ({
  itemName,
  status,
  requestDate,
  rentPeriod,
  returnDate,
  depositAmount,
  paymentAmount,
  onReviewClick
}) => {
  const navigate = useNavigate();
  const isRejected = status === "거절";

  return (
    <div className={`rental-card ${isRejected ? "rejected" : ""}`}>
      <div className="left-section">
        <div className="item-name">{itemName}</div>
        <div className="status-text">{status}</div>
      </div>

      <div className="right-section">
        {status === "신청완료" && (
          <div className="info-text">{requestDate}</div>
        )}

        {status === "결제 요청" && paymentAmount && (
          <button className="payment-button" onClick={() => navigate('/payment')}>
            {paymentAmount.toLocaleString()}원<br/>결제 ▶
          </button>
        )}

        {status === "대여 중" && (
          <div className="info-text">{rentPeriod}</div>
        )}

        {status === "대여 완료" && (
          <>
            <div className="info-text">{returnDate}</div>
            <div className="deposit-text">
              보증금({depositAmount?.toLocaleString()}원) 입금 예정
            </div>
          </>
        )}

        {status === "거래 완료" && (
          <button className="review-button" onClick={onReviewClick}>
            거래 후기<br/>작성 ▶
          </button>
        )}
      </div>
    </div>
  );
};

export default RentalItemCard;
