import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Auth/Auth.css';
import './NotiToggle.css';

const Register = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [nickName, setNickName] = useState('');
  const [password, setPassword] = useState('');
  const [newPW, setNewPW] = useState('');
  const [confirmPW, setConfirmPW] = useState('');
  const [bDay, setBDay] = useState('');
  const [notifications, setNotifications] = useState(false);

  return (
    <div className="editProfile-form">
      <h2>회원 정보 수정</h2>
      <input
        type="text"
        placeholder="이름"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
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
        value={bDay}
        onChange={(e) => setBDay(e.target.value)}
      />
      
      <div className="notification-setting">
        <span>알림 설정</span>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
          <span className="toggle-slider"></span>
        </label>
      </div>

      <button className="submit-button" onClick={() => navigate('/myPage')}>
        수정 완료
    </button>
    </div>
  );
};

export default Register; 