import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  const [realName, seRealName] = useState('');
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPW, setConfirmPW] = useState('');
  const [birthDate, setBirthDate] = useState('');

  return (
    <div className="register-form">
      <h2>회원가입</h2>
      <input
        type="text"
        placeholder="이름"
        value={realName}
        onChange={(e) => seRealName(e.target.value)}
      />
      <input
        type="text"
        placeholder="별명"
        value={nickName}
        onChange={(e) => setNickName(e.target.value)}
      />
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
      <input
        type="password"
        placeholder="비밀번호 확인"
        value={confirmPW}
        onChange={(e) => setConfirmPW(e.target.value)}
      />
      <div className='descriptInput'>
        생년월일
      </div>
      <input
        type="date"
        placeholder="생년월일"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
      />
      <button className="submit-button">회원가입</button>
      <div className="form-footer">
        <Link to="/login" className="text-button">
          로그인으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default Register; 