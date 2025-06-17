import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const ConfirmPW = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const userId = localStorage.getItem('userId');
    if (!userId) {
      setError('로그인이 필요합니다.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/users/verify-password', {
        user_id: parseInt(userId),
        password
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.data === false) {
        setError('비밀번호가 올바르지 않습니다.');
        return;
      } else if (response.data === true) {
        setSuccess('비밀번호가 확인되었습니다.');
        setTimeout(() => {
          navigate('/editProfile', { state: { background: location.state?.background || location } });
        }, 1000);
      }

    } catch (error) {
      if (error.request) {
        setError('서버에 연결할 수 없습니다.');
      } else {
        setError('오류가 발생했습니다.');
      }
    }
  }

  return (
    <div className="confirmPW-form">
      <h2>비밀번호 확인</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleSubmit} >
        <input
          type="password"
          placeholder="현재 비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="submit-button">확인</button>
      </form>
      <div className="form-footer">
        <Link to="/findPassword" state={{ background: location.state?.background || location }} className="text-button">
          비밀번호 찾기
        </Link>
      </div>
    </div>
  );
};

export default ConfirmPW; 