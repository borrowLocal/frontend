import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RequestModal from "../RequestModal/RequestModal";
import "./styles/ItemDetailCard.css";

const ItemDetailCard = ({ itemData }) => {
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
            <h2 className="item-detail-title">{itemData.title}</h2>
            <button
              className={`favorite-btn ${isFavorite ? "active" : ""}`}
              onClick={toggleFavorite}
              aria-label="즐겨찾기"
            >
              ★
            </button>
          </div>
          <p className="item-detail-price">
            {itemData.price_per_day.toLocaleString()}원/일 
            <span className="deposit">(보증금 {itemData.deposit_amount.toLocaleString()}원)</span>
          </p>
          <p className="item-detail-desc">
            {itemData.description}
          </p>
          <div className="item-card-actions">
            <select 
              value={selectedQuantity} 
              onChange={handleQuantityChange}
              max={itemData.quantity}
            >
              {[...Array(itemData.quantity)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}개</option>
              ))}
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
