import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import RequestModal from "../RequestModal/RequestModal";
import "./styles/ItemDetailCard.css";

const ItemDetailCard = ({ itemData }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [showRentalModal, setShowRentalModal] = useState(false);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) return;

      try {
        const response = await axios.get(`http://localhost:8080/favorites/${userId}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        });
        
        // 현재 아이템이 즐겨찾기 목록에 있는지 확인
        const isItemFavorited = response.data.some(item => item.item_id === parseInt(id));
        setIsFavorite(isItemFavorited);
      } catch (error) {
        console.error('즐겨찾기 상태 확인 중 오류 발생:', error);
      }
    };

    checkFavoriteStatus();
  }, [id]);

  const toggleFavorite = async () => {
    const userId = localStorage.getItem('userId');
      if (!userId) {
        navigate('/login');
        return;
      }

    try {
      if (!isFavorite) {
        await axios.post('http://localhost:8080/favorites', {
          user_id: userId,
          item_id: id
        });
      } else {
        await axios.delete(`http://localhost:8080/favorites/${id}?user_id=${userId}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        });
      }
      setIsFavorite(prev => !prev);
    } catch (error) {
      console.log("user_id, item_id", userId, id);
      console.error('즐겨찾기 처리 중 오류 발생:', error);
    }
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
        <img src={`http://localhost:8080${itemData.image_url}`} alt="물품 이미지" />
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
