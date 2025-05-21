import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import './Auth.css';

const ConfirmPW = () => {
  const navigate = useNavigate();
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
      <button className="submit-button" onClick={() => navigate('/editProfile')}>확인</button>
      <div className="form-footer">
        <Link to="/findPassword" className="text-button">
          비밀번호 찾기
        </Link>
      </div>
    </div>
  );
};

export default ConfirmPW; 