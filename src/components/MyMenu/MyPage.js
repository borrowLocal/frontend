import React from 'react';
import { Link } from 'react-router-dom';
import './MyPage.css';

const MyPage = () => {
  return (  
    <div className='mypage-container'>
      <div className="profile-section">
        <div className="profile-image"></div>
        <div className="profile-info">
          <h2>사용자 님</h2>
          <p>신뢰도 ★ (8/9)</p>
        </div>
      </div>

      <div className="menu-list">
        <hr></hr>
        <div className="menu-item">
          <Link to="/confirmPW" className="menu-link">
            회원정보 수정
          </Link>
        </div>
        <hr></hr>
        <div className="menu-item">
          <Link to="/rentalHistory" className="menu-link">
            대여 내역
          </Link>
        </div>
        <hr></hr>
        <div className="menu-item">
          <span>거래후기 조회</span>
        </div>  
        <hr></hr>       
        <div className="menu-item">
          <span>등록 물품 관리</span>
        </div>
        <hr></hr>
        <div className="menu-item">
          <span>즐겨찾기</span>
        </div>
        <hr></hr>
        <div className="menu-item">
          <Link to="/login" className="menu-link">
            로그인(디버깅)
          </Link>
        </div>
        <hr></hr>
        <div className="menu-item">
          <Link to="/reviewWrite" className="menu-link">
            후기 작성(디버깅)
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
