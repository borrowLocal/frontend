import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const Register = () => {
  const [realName, setRealName] = useState('');
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPW, setConfirmPW] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const location = useLocation();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPW) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/users', {
        email,
        password,
        real_name: realName,
        nick_name: nickName,
        birth_date: birthDate
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        setSuccess('회원가입이 완료되었습니다. 로그인 페이지로 이동하여 로그인해주세요.');
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else if (err.request) {
        setError('서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.');
      } else {
        setError('회원가입 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="register-form">
      <h2>회원가입</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="이름"
          value={realName}
          onChange={(e) => setRealName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="별명"
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
          required
        />
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
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPW}
          onChange={(e) => setConfirmPW(e.target.value)}
          required
        />
        <div className='descriptInput'>
          생년월일
        </div>
        <input
          type="date"
          placeholder="생년월일"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          required
        />
        <button type="submit" className="submit-button">회원가입</button>
      </form>
      <div className="form-footer">
        <Link to="/login" state={{ background: location.state?.background || location }} className="text-button">
          로그인으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default Register; 