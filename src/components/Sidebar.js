import React from 'react';
import { Link } from 'react-router-dom';
import useGeoLocation from '../hooks/useGeoLocation';
import useCityName from '../hooks/useCityName';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const geoLocation = useGeoLocation();
  const cityInfo = useCityName(geoLocation.coordinates || null);

  const renderLocationInfo = () => {
    if (!geoLocation.loaded) {
      return <li className="location-message">위치 정보를 가져오는 중...</li>;
    }

    if (geoLocation.error) {
      return <li className="location-message error">설정에서 위치 권한을 허용해주세요</li>;
    }

    if (!cityInfo.loaded) {
      return <li className="location-message">주소 정보를 가져오는 중...</li>;
    }

    if (cityInfo.error) {
      return <li className="location-message error">주소 정보를 가져오는데 실패했습니다</li>;
    }

    return <li className="active">🚩 {cityInfo.district}</li>;
  };

  return (
    <aside className="sidebar">
      <div className="menu-section">
        <h3>우리 동네</h3>
        <ul>
          {renderLocationInfo()}
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