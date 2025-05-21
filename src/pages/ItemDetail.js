import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ItemDetail.css';
import ProfileCard from '../components/cards/ProfileCard';
import ItemDetailCard from '../components/cards/ItemDetailCard';

const ItemDetail = () => {
  const { id } = useParams();

  return (
    <div className="item-detail-container">
      <ItemDetailCard />
      <hr/>
      <h3>대여자 정보</h3>
      <ProfileCard />
    </div>
  );
};

export default ItemDetail;
