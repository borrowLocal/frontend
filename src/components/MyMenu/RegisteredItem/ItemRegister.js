import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import useGeoLocation from '../../../hooks/useGeoLocation';
import useCityName from '../../../hooks/useCityName';
import './ItemRegister.css';

const ItemRegister = ({ onCancel }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const geoLocation = useGeoLocation();
  const cityInfo = useCityName(geoLocation.coordinates || null);
  const location = useLocation();
  const initialImageUrl = location.state?.imageUrl ? `http://localhost:8080${location.state.imageUrl}` : null;
  const [previewUrl, setPreviewUrl] = useState(initialImageUrl);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    quantity: '',
    price_per_day: '',
    deposit_amount: '',
    category_id: '',
  });
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchItemData = async () => {
      if (!id) return;

      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          setError('로그인이 필요합니다.');
          return;
        }

        const response = await axios.get(`http://localhost:8080/items/register/${id}`, {
          params: {
            user_id: userId
          }
        });

        const itemData = response.data;
        setFormData({
          title: itemData.title,
          description: itemData.description,
          quantity: itemData.quantity.toString(),
          price_per_day: itemData.price_per_day.toString(),
          deposit_amount: itemData.deposit_amount.toString(),
          category_id: itemData.category_id.toString(),
        });
        if (itemData.image_url) {
          setPreviewUrl(`http://localhost:8080${itemData.image_url}`);
        } else {
          setPreviewUrl(null);
        }
      } catch (err) {
        console.error('물품 정보를 가져오는데 실패했습니다:', err);
        setError('물품 정보를 가져오는데 실패했습니다.');
      }
    };

    fetchItemData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setError('로그인이 필요합니다.');
        return;
      }

      if (!cityInfo.district) {
        setError('위치 정보를 가져오는데 실패했습니다.');
        return;
      }

      const dto = {
        ...formData,
        location: cityInfo.district,
        user_id: parseInt(userId),
        quantity: parseInt(formData.quantity),
        price_per_day: parseInt(formData.price_per_day),
        deposit_amount: parseInt(formData.deposit_amount),
        category_id: parseInt(formData.category_id)
      };

      const form = new FormData();
      form.append("dto", new Blob([JSON.stringify(dto)], { type: "application/json" }));
      if (imageFile) {
        form.append("file", imageFile);
      }

      let response;
      if (id) {
        // 수정 요청
        response = await axios.put(`http://localhost:8080/items/register/${id}`,
          form,
          {
            // Content-Type을 명시하지 않음 (브라우저가 자동 설정)
          }
        );
      } else {
        // 새로 등록
        response = await axios.post('http://localhost:8080/items',
          form,
          {
            // Content-Type을 명시하지 않음 (브라우저가 자동 설정)
          }
        );
      }
      
      // 성공 시 처리
      if (response.status === 200) {
        alert(id ? '물품 수정 성공!' : '물품 등록 성공!');
        navigate('/registeredItem');
      }

    } catch (err) {
      console.error('아이템 등록/수정에 실패했습니다:', err);
      if (err.response?.status === 400) {
        setError('입력 정보를 확인해주세요.');
      } else if (err.response?.status === 401) {
        setError('로그인이 필요합니다.');
      } else {
        setError('아이템 등록/수정에 실패했습니다.');
      }
    }
  };

  return (
    <div className="item-register-container">
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="item-register-form-buttons">
            <button className="item-register-cancel-button" onClick={() => navigate('/registeredItem')}>
                취소
            </button>
          <button type="submit" className="item-register-submit-button">
            {id ? '수정' : '등록'}
          </button>
        </div>

        <div className="item-register-main">
            <div className="item-register-image">
                <img src={previewUrl || ''} />
                <input
                  className="item-register-image-input"
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    const file = e.target.files[0];
                    setImageFile(file);
                    if (file) {
                      setPreviewUrl(URL.createObjectURL(file));
                    } else {
                      setPreviewUrl(null);
                    }
                  }}
                />
            </div>

            <div className="item-register-form">
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="물품 명"
                    required
                />

                <div className="row-inputs">
                    <input
                        type="number"
                        name="price_per_day"
                        value={formData.price_per_day}
                        onChange={handleInputChange}
                        placeholder="대여비 (/일)"
                        required
                    />
                    <input
                        type="number"
                        name="deposit_amount"
                        value={formData.deposit_amount}
                        onChange={handleInputChange}
                        placeholder="보증금"
                        required
                    />
                </div>
                
                <div className="row-inputs">
                    <select
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">카테고리 선택</option>
                        <option value="0">생활가전 (다리미 등)</option>
                        <option value="1">생활/주방 (공구, 베이킹 도구 등)</option>
                        <option value="2">여성패션/잡화</option>
                        <option value="3">남성패션/잡화</option>
                        <option value="4">스포츠/레저 (캠핑, 스키 등)</option>
                        <option value="5">취미/게임 (악기 등)</option>
                        <option value="6">디지털기기 (카메라, 스피커 등)</option>
                        <option value="7">기타</option>
                    </select>
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        placeholder="수량"
                        required
                    />
                </div>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="설명"
              rows="5"
              required
            />
          </div>     
        </div>
      </form>
    </div>
  );
};

export default ItemRegister;
