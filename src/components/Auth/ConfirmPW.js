import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import './Auth.css';

const ConfirmPW = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState('');

  return (
    <div className="confirmPW-form">
      <h2>비밀번호 확인</h2>
      <input
        type="password"
        placeholder="현재 비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="submit-button" onClick={() => navigate('/editProfile', { state: { background: location.state?.background || location } })}>확인</button>
      <div className="form-footer">
        <Link to="/findPassword" state={{ background: location.state?.background || location }} className="text-button">
          비밀번호 찾기
        </Link>
      </div>
    </div>
  );
};

export default ConfirmPW; 