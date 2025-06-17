import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/ItemDetail.css';
import ProfileCard from '../components/cards/ProfileCard';
import ItemDetailCard from '../components/cards/ItemDetailCard';

const ItemDetail = () => {
  const { id } = useParams();
  const [itemData, setItemData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItemDetail = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(`http://localhost:8080/items/${id}?user_id=${userId}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        });

        if (response.status === 200) {
          setItemData(response.data);
        }
      } catch (err) {
        if (err.response) {
          setError('아이템 정보를 불러오는데 실패했습니다.');
        } else if (err.request) {
          setError('서버에 연결할 수 없습니다.');
        } else {
          setError('아이템 조회 중 오류가 발생했습니다.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetail();
  }, [id]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!itemData) return <div>아이템을 찾을 수 없습니다.</div>;

  return (
    <div className="item-detail-container">
      <ItemDetailCard itemData={itemData} />
      <hr/>
      <h3>대여자 정보</h3>
      <ProfileCard ownerData={itemData} />
    </div>
  );
};

export default ItemDetail;
