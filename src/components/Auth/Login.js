import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Auth.css';

const Login = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  
  return (
    <div className="login-form">
      <h2>로그인</h2>
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="submit-button">로그인</button>
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