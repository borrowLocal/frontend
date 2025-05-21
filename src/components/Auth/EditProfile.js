import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const [realName, setRealName] = useState('');
  const [nickName, setNickName] = useState('');
  const [password, setPassword] = useState('');
  const [newPW, setNewPW] = useState('');
  const [confirmPW, setConfirmPW] = useState('');
  const [birthDate, setBirthDate] = useState('');

  return (
    <div className="editProfile-form">
      <h2>회원 정보 수정</h2>
      <input
        type="text"
        placeholder="이름"
        value={realName}
        onChange={(e) => setRealName(e.target.value)}
      />
      <input
        type="text"
        placeholder="별명"
        value={nickName}
        onChange={(e) => setNickName(e.target.value)}
      />
      <input
        type="password"
        placeholder="현재 비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="새 비밀번호"
        value={newPW}
        onChange={(e) => setNewPW(e.target.value)}
      />
      <input
        type="password"
        placeholder="새 비밀번호 확인"
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
      <button className="submit-button" onClick={() => navigate('/myPage')}>
        수정 완료
    </button>
    </div>
  );
};

export default Register; 