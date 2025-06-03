import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const [realName, setRealName] = useState('');
  const [nickName, setNickName] = useState('');
  const [password, setPassword] = useState('');
  const [newPW, setNewPW] = useState('');
  const [confirmPW, setConfirmPW] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteAccount = async () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.delete(`http://localhost:8080/users/${userId}`);
      
      if (response.status === 200) {
        localStorage.removeItem('userId');
        navigate('/');
      }
    } catch (error) {
      console.error('회원 탈퇴 실패:', error);
      alert('회원 탈퇴에 실패했습니다.');
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

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
      <div className="form-footer">
        <button className="text-button" onClick={handleDeleteAccount}>
          회원 탈퇴
        </button>
      </div>
      {showDeleteConfirm && (
        <div className="delete-confirm-modal">
          <div className="delete-confirm-content">
            <p>정말로 탈퇴하시겠습니까?</p>
            <div className="delete-confirm-buttons">
              <button className="confirm-button" onClick={confirmDelete}>네</button>
              <button className="cancel-button" onClick={cancelDelete}>아니오</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register; 