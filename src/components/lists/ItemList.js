import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/ItemList.css';

const ItemList = () => {
  const navigate = useNavigate();

  const handleItemClick = (id) => {
    navigate(`/item/${id}`);
  };

  return (
    <main className="main-content">
      <div className="items-grid">
        {[...Array(15)].map((_, index) => (
          <div
            key={index}
            className="item-card"
            onClick={() => handleItemClick(index)}
            style={{ cursor: 'pointer' }}
          >
            <div className="item-image"></div>
            <h4 className="item-title">Title {index + 1}</h4>
            <p className="item-update">Updated today</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ItemList;
