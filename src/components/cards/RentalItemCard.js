import "./styles/RentalItemCard.css";

const RentalItemCard = ({
  itemName,
  status,
  requestDate,
  rentPeriod,
  onPaymentClick,
  onReviewClick
}) => {
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

        {status === "결제요청" && (
          <div className="button-wrapper">
          <button className="payment-button" onClick={onPaymentClick}>
            결제 ▶
          </button>
        </div>
        )}

        {status === "대여중" && (
          <div className="info-text">{rentPeriod}</div>
        )}

        {status === "대여완료" && (
          <div className="button-wrapper">
          <button className="review-button" onClick={onReviewClick}>
            거래 후기<br/>작성 ▶
          </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RentalItemCard;
