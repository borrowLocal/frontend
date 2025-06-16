import React, { useState, useEffect } from "react";
import RegisteredItemCard from "../cards/RegisteredItemCard";
import RequestModal from "../RequestModal/RequestModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisteredItemList = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserItems = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          setError('로그인이 필요합니다.');
          return;
        }

        const response = await axios.get(`http://localhost:8080/items/user/${userId}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        });

        setItems(response.data);
        setError(null);
      } catch (err) {
        console.error('등록된 아이템을 불러오는데 실패했습니다:', err);
        if (err.response?.status === 401) {
          setError('로그인이 필요합니다.');
        } else if (err.response?.status === 404) {
          setError('등록된 아이템이 없습니다.');
        } else {
          setError('등록된 아이템을 불러오는데 실패했습니다.');
        }
      }
    };

    fetchUserItems();
  }, []);

  const handleConfirm = (id) => {
    navigate(`/registeredItem/request?id=${id}`);
  };

  const handleReview = () => {
    setModalType('review');
    setShowModal(true);
  };

  const handleReport = () => {
    setModalType('report');
    setShowModal(true);
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (items.length === 0) {
    return <div>등록된 아이템이 없습니다.</div>;
  }

  return (
    <>
      <div>
        {items.map(item => (
          <RegisteredItemCard
            key={item.item_id}
            id={item.item_id}
            title={item.title}
            description={item.description}
            quantity={item.quantity}
            depositAmount={item.deposit_amount}
            pricePerDay={item.price_per_day}
            imageUrl={item.image_url}
            status={item.item_status}
            rentedQuantity={item.rented_quantity}
            onEdit={() => alert("수정")}
            onDelete={() => alert("삭제")}
            onConfirm={() => handleConfirm(item.item_id)}
            onComplete={handleReview}
            onReport={handleReport}
            onChangeToAvailable={() => alert("거래 가능으로 변경")}
          />
        ))}
      </div>
      {showModal && (
        <RequestModal
          type={modalType}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default RegisteredItemList;