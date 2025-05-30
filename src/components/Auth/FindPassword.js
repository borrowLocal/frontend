import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import './Auth.css';

const FindPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const location = useLocation();

  return (
    <div className="register-form">
      <h2>비밀번호 찾기</h2>
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="submit-button" onClick={() => navigate('/resetPW', { state: { background: location.state?.background || location } })}>비밀번호 찾기</button>
      <div className="form-footer">
        <Link to="/login" state={{ background: location.state?.background || location }} className="text-button">
          로그인으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default FindPassword; 