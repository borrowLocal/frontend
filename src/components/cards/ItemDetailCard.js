import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RequestModal from "../RequestModal/RequestModal";
import "./styles/ItemDetailCard.css";

const ItemDetailCard = ({ onAccept, onReject }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [showRentalModal, setShowRentalModal] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(prev => !prev);
  };

  const handleQuantityChange = (e) => {
    const quantity = parseInt(e.target.value);
    setSelectedQuantity(quantity);
  };

  const handleRentalRequest = () => {
    setShowRentalModal(true);
  };

  return (
    <>
      <div className="item-detail-card">
        <div className="item-detail-card-image">
          <img />
        </div>

        <div className="item-detail-card-content">
          <div className="item-detail-title-row">
            <h2 className="item-detail-title">네셔널지오그래픽 텐트</h2>
            <button
              className={`favorite-btn ${isFavorite ? "active" : ""}`}
              onClick={toggleFavorite}
              aria-label="즐겨찾기"
            >
              ★
            </button>
          </div>
          <p className="item-detail-price">
            5만원/일 <span className="deposit">(보증금 50만원)</span>
          </p>
          <p className="item-detail-desc">
            3년 전에 매장에서 구매한 정품입니다.<br />
            4인 가족이 쓰기에 좋아요.<br />
            4번 사용했어요.<br />
            텐트 의자도 필요하시면 같이 대여해드립니다.
          </p>
          <div className="item-card-actions">
            <select value={selectedQuantity} onChange={handleQuantityChange}>
              <option value={1}>1개</option>
              <option value={2}>2개</option>
              <option value={3}>3개</option>
            </select>
            <button className="item-rent-btn" onClick={handleRentalRequest}>대여 신청</button>
          </div>
        </div>
      </div>
      {showRentalModal && (
        <RequestModal
          type="rental"
          quantity={selectedQuantity}
          onClose={() => setShowRentalModal(false)}
        />
      )}
    </>
  );
};

export default ItemDetailCard;
