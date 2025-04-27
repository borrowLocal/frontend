import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LoginModal.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        <Link to="/register" className="text-button">
          회원가입
        </Link>
        <Link to="/findPassword" className="text-button">
          비밀번호 찾기
        </Link>
      </div>
    </div>
  );
};

export default Login; 