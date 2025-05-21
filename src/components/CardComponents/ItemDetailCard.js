import { useState } from "react";
import "./styles/ItemDetailCard.css"; // Assuming you have a CSS file for styles

const ItemDetailCard = ({ onAccept, onReject }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(prev => !prev);
  };

  return (
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
          <select>
            <option>1개</option>
            <option>2개</option>
            <option>3개</option>
          </select>
          <button className="item-rent-btn">대여 신청</button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailCard;
