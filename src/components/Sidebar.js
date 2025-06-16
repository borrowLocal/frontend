import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useGeoLocation from '../hooks/useGeoLocation';
import useCityName from '../hooks/useCityName';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const geoLocation = useGeoLocation();
  const cityInfo = useCityName(geoLocation.coordinates || null);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleCategoryClick = (categoryId) => {
    const location = cityInfo.district || '';
    const currentCategoryId = searchParams.get('category_id');
    
    // 현재 선택된 카테고리를 다시 클릭한 경우
    if (currentCategoryId === categoryId.toString()) {
      navigate(`/?location=${encodeURIComponent(location)}`);
    } else {
      navigate(`/?location=${encodeURIComponent(location)}&category_id=${categoryId}`);
    }
  };

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
          <li 
            onClick={() => handleCategoryClick(0)}
            className={searchParams.get('category_id') === '0' ? 'active' : ''}
          >
            생활가전 (다리미 등)
          </li>
          <li 
            onClick={() => handleCategoryClick(1)}
            className={searchParams.get('category_id') === '1' ? 'active' : ''}
          >
            생활/주방 (공구, 베이킹 도구 등)
          </li>
          <li 
            onClick={() => handleCategoryClick(2)}
            className={searchParams.get('category_id') === '2' ? 'active' : ''}
          >
            여성패션/잡화
          </li>
          <li 
            onClick={() => handleCategoryClick(3)}
            className={searchParams.get('category_id') === '3' ? 'active' : ''}
          >
            남성패션/잡화
          </li>
          <li 
            onClick={() => handleCategoryClick(4)}
            className={searchParams.get('category_id') === '4' ? 'active' : ''}
          >
            스포츠/레저 (캠핑, 스키 등)
          </li>
          <li 
            onClick={() => handleCategoryClick(5)}
            className={searchParams.get('category_id') === '5' ? 'active' : ''}
          >
            취미/게임 (악기 등)
          </li>
          <li 
            onClick={() => handleCategoryClick(6)}
            className={searchParams.get('category_id') === '6' ? 'active' : ''}
          >
            디지털기기 (카메라, 스피커 등)
          </li>
          <li 
            onClick={() => handleCategoryClick(7)}
            className={searchParams.get('category_id') === '7' ? 'active' : ''}
          >
            기타
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar; 