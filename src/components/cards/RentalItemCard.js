import axios from "axios";
import "./styles/RentalItemCard.css";

const RentalItemCard = ({
  itemName,
  status,
  requestDate,
  rentPeriod,
  rentalId,
  onPaymentClick,
  onReviewClick
}) => {
  const isRejected = status === "거절";

  const handleReviewClick = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/reviews/rental/${rentalId}`);
      onReviewClick(response.data);
    } catch (error) {
      console.error('리뷰 정보 요청 중 오류가 발생했습니다:', error);
    }
  };

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
          <button className="review-button" onClick={handleReviewClick}>
            거래 후기<br/>작성 ▶
          </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RentalItemCard;
