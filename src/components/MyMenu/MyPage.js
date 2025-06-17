import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MyPage.css';

const mockData = {
  nickName: '여의도 주술사',
  rating: 8,
};

const MyPage = () => {
  const [nickName, setNickName] = useState('');
  const [rating, setRating] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setNickName(mockData.nickName);
    setRating(mockData.rating);
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) return;
      
      const response = await axios.get(`/favorites/${userId}`);
      setFavorites(response.data);
    } catch (error) {
      console.error('즐겨찾기 목록 조회 중 오류 발생:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/login', { state: { background: location.state?.background || location } });
  };

  return (  
    <div className='mypage-container'>
      <div className="profile-section">
        <div className="profile-image"></div>
        <div className="profile-info">
          <p className='profile-nickName'><strong>{nickName}</strong> 님</p>
          <p className='profile-rating'>신뢰도 ★ ({rating}/9)</p>
        </div>
      </div>

      <div className="menu-list">
        <hr></hr>
        <div className="menu-item">
          <Link to="/confirmPW" state={{ background: location.state?.background || location }} className="menu-link">
            회원정보 수정
          </Link>
        </div>
        <hr></hr>
        <div className="menu-item">
          <Link to="/rentalHistory" state={{ background: location.state?.background || location }} className="menu-link">
            대여 내역
          </Link>
        </div>
        <hr></hr>
        <div className="menu-item">
          <Link to="/reviewList" state={{ background: location.state?.background || location }} className="menu-link">
            거래 후기 조회
          </Link>
        </div>  
        <hr></hr>       
        <div className="menu-item">
          <Link to="/registeredItem" className="menu-link">
            등록 물품 관리
          </Link>
        </div>
        <hr></hr>
        <div className="menu-item">
          <Link to="/favorites" className="menu-link">
            즐겨찾기
          </Link>
        </div>
        <hr></hr>
      </div>

      <button className="logout-button" onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;
