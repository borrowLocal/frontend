import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import profileImg from '../../assets/profile.jpg';
import axios from 'axios';
import './MyPage.css';

const MyPage = () => {
  const [nickName, setNickName] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setError('로그인이 필요합니다.');
        navigate('/login', { state: { background: location.state?.background || location } });
        return;
      }
      try {
        const response = await axios.get(`http://localhost:8080/users/${userId}`);
        setNickName(response.data.nick_name);
        setRating(response.data.rating);
        setError('');
      } catch (err) {
        setError('유저 정보를 불러오지 못했습니다.');
      }
    };
    fetchUserInfo();
  }, [navigate, location]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/onboarding');
  };

  return (  
    <div className='mypage-container'>
      <div className="profile-section">
        <img className="profile-image" src={profileImg} />
        <div className="profile-info">
          <p className='profile-nickName'><strong>{nickName}</strong> 님</p>
          <p className='profile-rating'>신뢰도 ★ ({rating}/9)</p>
        </div>
      </div>
      {error && <div className="error-message">{error}</div>}
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
