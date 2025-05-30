import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import '../Auth/Auth.css';

const ResetPW = () => {
  const navigate = useNavigate();
  const [newPW, setNewPW] = useState('');
  const [newPWConfirm, setNewPWConfirm] = useState('');
  const location = useLocation();

  return (
    <div className="resetPW-form">
      <h2>비밀번호 재설정</h2>
      <input
        type="password"
        placeholder="새 비밀번호"
        value={newPW}
        onChange={(e) => setNewPW(e.target.value)}
      />
      <input
        type="password"
        placeholder="새 비밀번호 확인"
        value={newPWConfirm}
        onChange={(e) => setNewPWConfirm(e.target.value)}
      />
      <button className="submit-button" onClick={() => navigate('/login', { state: { background: location.state?.background || location } })}>확인</button>
    </div>
  );
};

export default ResetPW; 