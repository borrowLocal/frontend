import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios';
import '../Auth/Auth.css';

const ResetPW = () => {
  const navigate = useNavigate();
  const [newPW, setNewPW] = useState('');
  const [newPWConfirm, setNewPWConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();

  // email, code를 state로부터 추출
  const { email, code } = location.state || {};

  const handleResetPW = async () => {
    if (!newPW || !newPWConfirm) {
      setError('비밀번호를 모두 입력해주세요.');
      return;
    }
    if (newPW !== newPWConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!email || !code) {
      setError('인증 정보가 없습니다. 처음부터 다시 시도해주세요.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await axios.post('http://localhost:8080/users/password/reset', {
        email,
        new_password: newPW
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
      alert('비밀번호가 성공적으로 변경되었습니다.');   
      navigate('/login', { state: { background: location.state?.background || location } });
    } catch (err) {
      setError('비밀번호 재설정에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

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
      <button className="submit-button" onClick={handleResetPW} disabled={loading}>
        확인
      </button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default ResetPW; 