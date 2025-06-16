import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useGeoLocation from '../../hooks/useGeoLocation';
import useCityName from '../../hooks/useCityName';
import axios from 'axios';
import '../../styles/ItemList.css';

const ItemList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const geoLocation = useGeoLocation();
  const cityInfo = useCityName(geoLocation.coordinates || null);

  useEffect(() => {
    const fetchItems = async () => {
      if (!cityInfo.loaded || !cityInfo.district) return;
      
      try {
        const categoryId = searchParams.get('category_id');
        const location = cityInfo.district;
        
        let url = `http://localhost:8080/items?location=${encodeURIComponent(location)}`;
        if (categoryId) {
          url += `&category_id=${categoryId}`;
        }
      
        const response = await axios.get(url, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        });

        setItems(response.data);
        setError(null);
      } catch (err) {
        console.error('아이템을 불러오는데 실패했습니다:', err);
        if (err.response.status === 400) {
          setError('해당 위치의 아이템이 없습니다.');
        } else if (err.response.status === 500) {
          setError('서버에서 오류가 발생했습니다.');
        } else if (err.request) {
          setError('서버에 연결할 수 없습니다. 서버가 실행 중인지 확인하세요.');
        } else {
          setError('아이템을 불러오는데 실패했습니다.');
        }
        setItems([]);
      }
    };

    fetchItems();
  }, [searchParams, cityInfo.loaded, cityInfo.district]);

  const handleItemClick = (id) => {
    navigate(`/item/${id}`);
  };

  return (
    <main className="main-content">
      {error && <div className="error-message">{error}</div>}
      <div className="items-grid">
        {items.map((item) => (
          <div
            key={item.item_id}
            className="item-card"
            onClick={() => handleItemClick(item.item_id)}
            style={{ cursor: 'pointer' }}
          >
            <div className="item-image"></div>
            <h4 className="item-title">{item.title}</h4>
            <p className="item-update">
              {new Date(item.update_time).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ItemList;
