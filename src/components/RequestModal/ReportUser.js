import React, { useState } from 'react';
import './RequestModal.css';

const ReportUser = ({ onClose }) => {
  const userName = useState("성북구 헌터");
  const [reportMessage, setReportMessage] = useState('');

  return (
    <div className="reportUser-content">
      <div className="profile-section">
        <div className="profile-image"></div>
        <span>{userName}</span>님 과의 거래 후기
      </div>
      
      <input
        type="textarea"
        className='reportUser-input'
        value={reportMessage}
        onChange={(e) => setReportMessage(e.target.value)}
      />

      <button className="submit-button">신고</button>
    </div>
  );
};

export default ReportUser; 