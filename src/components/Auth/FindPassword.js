import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const FindPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();

  // 인증코드 요청
  const handleSendCode = async () => {
    setLoading(true);
    setError('');
    try {
      await axios.post('http://localhost:8080/email/send-code', { email }, {
        headers: { 'Content-Type': 'application/json' }
      });
      setShowCodeInput(true);
      alert('인증코드가 이메일로 전송되었습니다.');
    } catch (err) {
      setError('인증코드 전송에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 인증코드 검증
  const handleVerifyCode = async () => {
    setLoading(true);
    setError('');
    try {
      await axios.post('http://localhost:8080/email/verify-code', { email, code }, {
        headers: { 'Content-Type': 'application/json' }
      });
      navigate('/resetPW', { state: { email, code, background: location.state?.background || location } });
    } catch (err) {
      setError('인증코드가 올바르지 않거나 만료되었습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-form">
      <h2>비밀번호 찾기</h2>
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={showCodeInput}
      />
      {!showCodeInput && (
        <button className="submit-button" onClick={handleSendCode} disabled={loading || !email}>
          인증코드 받기
        </button>
      )}
      {showCodeInput && (
        <>
          <input
            type="text"
            placeholder="인증번호"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button className="submit-button" onClick={handleVerifyCode} disabled={loading || !code}>
            비밀번호 찾기
          </button>
        </>
      )}
      {error && <div className="error-message">{error}</div>}
      <div className="form-footer">
        <Link to="/login" state={{ background: location.state?.background || location }} className="text-button">
          로그인으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default FindPassword; 