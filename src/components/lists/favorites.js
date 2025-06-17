import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/ItemList.css';

const FavoritesList = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

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

        setItems(response.data);
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

export default FavoritesList;
