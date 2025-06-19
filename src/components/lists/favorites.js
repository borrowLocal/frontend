import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/ItemList.css';

const FavoritesList = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchFavorites = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/favorites/${userId}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        });

        // 응답이 배열인지 확인
        setItems(Array.isArray(response.data) ? response.data : []);
        setError(null);
      } catch (err) {
        console.error('즐겨찾기 목록을 불러오는데 실패했습니다:', err);
        setError('즐겨찾기 목록을 불러오는데 실패했습니다.');
        setItems([]);
      }
    };

    fetchFavorites();
  }, []);

  const handleItemClick = (id) => {
    navigate(`/item/${id}`);
  };

  // 검색어에 따라 필터링된 아이템 목록
  const filteredItems = items.filter(item => {
    if (!searchQuery.trim()) {
      return true;
    }
    return item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <main className="main-content">
      <div className="search-bar">
        <input
          type="text"
          placeholder="검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="items-grid">
        {filteredItems.map((item) => (
          <div
            key={item.item_id}
            className="item-card"
            onClick={() => handleItemClick(item.item_id)}
            style={{ cursor: 'pointer' }}
          >
            <div>
              <img
                className="item-image"
                src={`http://localhost:8080${item.image_url}`}
                alt="물품 이미지"
              />
            </div>
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

export default FavoritesList;
