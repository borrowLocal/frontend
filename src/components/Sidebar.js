import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="menu-section">
        <h3>우리 동네</h3>
        <ul>
          <li className="active">🚩 월곡동</li>
        </ul>
      </div>
      
      <div className="menu-section">
        <h3>카테고리</h3>
        <ul>
          <li>생활가전 (다리미 등)</li>
          <li>생활/주방 (공구, 베이킹 도구 등)</li>
          <li>여성패션/잡화</li>
          <li>남성패션/잡화</li>
          <li>스포츠/레저 (캠핑, 스키 등)</li>
          <li>취미/게임 (악기 등)</li>
          <li>디지털기기 (카메라, 스피커 등)</li>
          <li>기타</li>
          <li>
            <Link to="/rentalRequest">(디버깅) 대여 신청 모달</Link>
          </li>
          <li>
            <Link to="/review">(디버깅) 유저 평가 모달</Link>
          </li>
          <li>
            <Link to="/reportUser">(디버깅) 유저 신고 모달</Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar; 