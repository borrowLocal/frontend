import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const Login = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      const response = await axios.post('http://localhost:8080/users/login', {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        localStorage.setItem('userId', response.data.user_id);
        setSuccess('로그인이 완료되었습니다.');
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          setError('이메일 또는 비밀번호가 올바르지 않습니다.');
        } else {
          setError('로그인에 실패했습니다.');
        }
      } else if (err.request) {
        setError('서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.');
      } else {
        setError('로그인 중 오류가 발생했습니다.');
      }
    }
  }

  return (
    <div className="login-form">
      <h2>로그인</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="submit-button">로그인</button>
      </form>
      <div className="form-footer">
        <Link to="/register" state={{ background: location.state?.background || location }} className="text-button">
          회원가입
        </Link>
        <Link to="/findPassword" state={{ background: location.state?.background || location }} className="text-button">
          비밀번호 찾기
        </Link>
      </div>
    </div>
  );
};

export default Login; 