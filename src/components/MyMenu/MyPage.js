import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './MyPage.css';

const mockData = {
  nickName: '성북구 헌터',
  rating: 8,
};

const MyPage = () => {
  const [nickName, setNickName] = useState('');
  const [rating, setRating] = useState(0);
  const location = useLocation();
    useEffect(() => {
      setNickName(mockData.nickName);
      setRating(mockData.rating);
    }, []);

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
          <span>즐겨찾기</span>
        </div>
        <hr></hr>
        <div className="menu-item">
          <Link to="/login" state={{ background: location.state?.background || location }} className="menu-link">
            로그인(디버깅)
          </Link>
        </div>
        <hr></hr>
        <div className="menu-item">
          <Link to="/onboarding" className="menu-link">
            온보딩(디버깅)
          </Link>
        </div>
        <hr></hr>
      </div>

      <button className="logout-button">
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;
