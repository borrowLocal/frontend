import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const FindPassword = () => {
  const [email, setEmail] = useState('');

  return (
    <div className="register-form">
      <h2>비밀번호 찾기</h2>
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="submit-button">비밀번호 찾기</button>
      <div className="form-footer">
        <Link to="/login" className="text-button">
          로그인으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default FindPassword; 