import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const EditProfile = () => {
  const navigate = useNavigate();
  const [realName, setRealName] = useState('');
  const [nickName, setNickName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [newPW, setNewPW] = useState('');
  const [confirmPW, setConfirmPW] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
      setError('');
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setError('로그인이 필요합니다.');
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`http://localhost:8080/users/${userId}`);
        setNickName(response.data.nick_name || '');
        setRealName(response.data.real_name || '');
        setBirthDate(response.data.birth_date || '');
        setEmail(response.data.email || '');
        setError('');
      } catch (err) {
        setError('유저 정보를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, []);

  const handleUpdateProfile = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setError('로그인이 필요합니다.');
      setLoading(false);
      return;
    }
    try {
      await axios.put(`http://localhost:8080/users/${userId}`, {
        user_id: userId,
        real_name: realName,
        nick_name: nickName,
        birth_date: birthDate
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
      setSuccess('회원 정보가 수정되었습니다.');
      setError('');
    } catch (err) {
      setError('회원 정보 수정에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    if (!newPW || !confirmPW) {
      setError('새 비밀번호를 모두 입력해주세요.');
      setLoading(false);
      return;
    }
    if (newPW !== confirmPW) {
      setError('비밀번호가 일치하지 않습니다.');
      setLoading(false);
      return;
    }
    try {
      await axios.post('http://localhost:8080/users/password/reset', {
        email,
        new_password: newPW
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
      setSuccess('비밀번호가 변경되었습니다.');
      setNewPW('');
      setConfirmPW('');
    } catch (err) {
      setError('비밀번호 변경에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

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
      {loading && <div className="loading-message">로딩 중...</div>}
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
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
      <div className='descriptInput'>생년월일</div>
      <input
        type="date"
        placeholder="생년월일"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
      />
      <button className="submit-button" onClick={handleUpdateProfile} disabled={loading}>
        수정 완료
      </button>
      <br /><br />
      
      <h3>비밀번호 변경</h3>
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled
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
      <button className="submit-button" onClick={handleChangePassword} disabled={loading}>
        비밀번호 변경
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

export default EditProfile; 