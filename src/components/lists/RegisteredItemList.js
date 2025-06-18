import React, { useState, useEffect } from "react";
import RegisteredItemCard from "../cards/RegisteredItemCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisteredItemList = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchUserItems();
  }, []);

  const handleDelete = async (itemId) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setError('로그인이 필요합니다.');
        return;
      }

      const response = await axios.delete(`http://localhost:8080/items/rigister/${itemId}`, {
        params: {
          user_id: userId
        },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        // 삭제 후 목록 새로고침
        fetchUserItems();
      }
    } catch (err) {
      console.error('아이템 삭제에 실패했습니다:', err);
      if (err.response?.status === 401) {
        setError('로그인이 필요합니다.');
      } else if (err.response?.status === 403) {
        setError('삭제 권한이 없습니다.');
      } else {
        setError('아이템 삭제에 실패했습니다.');
      }
    }
  };

  const handleConfirm = (id) => {
    navigate(`/registeredItem/request?id=${id}`);
  };

  if (error) { return <div className="error-message">{error}</div>; }
  if (items.length === 0) { return <div>등록된 아이템이 없습니다.</div>; }

  return (
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
            onDelete={() => handleDelete(item.item_id)}
            onConfirm={() => handleConfirm(item.item_id)}
            onChangeToAvailable={() => alert("거래 가능으로 변경")}
          />
        ))}
      </div>
  );
};

export default RegisteredItemList;