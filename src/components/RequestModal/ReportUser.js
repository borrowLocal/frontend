import React, { useState } from 'react';
import axios from 'axios';
import './RequestModal.css';

const ReportUser = ({ onClose, reportData }) => {
  const [userName] = useState(reportData?.nickname);
  const [reportMessage, setReportMessage] = useState('');

  const handleReport = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert('로그인이 필요합니다.');
        return;
      }

      const requestBody = {
        reporter_id: userId,
        target_user_id: reportData?.targetUserId,
        rental_id: reportData?.rentalId,
        created_at: new Date().toISOString(),
        reason: reportMessage
      };
      
      const response = await axios.post(`http://localhost:8080/reports/${userId}`, requestBody);
      console.log(response.data);
      onClose();
    }
    catch (error) {
      const messages = error.response.data.errors.map(err => err.message).join('\n');
      alert(messages);
    }
    };

  return (
    <div className="reportUser-content">
      <div className="profile-section">
        <div className="profile-image"></div>
        <span>{userName}</span>님 신고 사유
      </div>
      
      <input
        type="textarea"
        className='reportUser-input'
        value={reportMessage}
        onChange={(e) => setReportMessage(e.target.value)}
      />

      <button className="submit-button" onClick={handleReport}>신고</button>
    </div>
  );
};

export default ReportUser; 