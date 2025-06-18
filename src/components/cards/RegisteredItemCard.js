import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RequestModal from '../RequestModal/RequestModal';
import "./styles/RegisteredItemCard.css";

const statusClass = (status) => {
  switch (status) {
    case "거래가능":
      return "badge-available";
    case "거래요청":
      return "badge-requested";
    case "대여중":
      return "badge-renting";
    case "완료":
      return "badge-complete";
    case "신고":
      return "badge-reported";
    default:
      return "";
  }
};

const RegisteredItemCard = ({
  id,
  title, // 제목
  rentedQuantity, // 대여 중인 수량
  quantity, // 수량
  pricePerDay, // 일일 대여료
  depositAmount, // 보증금
  description,
  imageUrl,
  status,
  onDelete,
  onConfirm,
  onChangeToAvailable
}) => {
  const navigate = useNavigate();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [reviewData, setReviewData] = useState(null);
  const [reportData, setReportData] = useState(null);

  const handleEdit = () => {
    navigate(`register/${id}`);
  };

  const handleReview = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/reviews/item/${id}`);
      setModalType('review');
      setReviewData(response.data);
      setShowReviewModal(true);
    } catch (error) {
      console.error('유저 정보 요청 중 오류가 발생했습니다:', error);
    }
  };

  const handleReport = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/reports/item/${id}`);
      setModalType('report');
      setReportData(response.data);
      setShowReportModal(true);
    } catch (error) {
      console.error('유저 정보 요청 중 오류가 발생했습니다:', error);
    }
  };

  return (
    <>
    <div className="registered-card">
      <div className="register-left-section">
        <div>
          {imageUrl ? (
            <img src={imageUrl} className="registered-item-image" />
          ) : (
            <img className="registered-item-image" />
          )}
        </div>
        <div className="registered-item-info">
          <div className="item-title">{`${title} (${quantity-rentedQuantity}/${quantity}개)`}</div>
          <div className="price-info">{`${pricePerDay}원/일 (보증금 ${depositAmount}원)`}</div>
          <div className="item-description">
            {description.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </div>
          <div className="bottom-row">
          <div className={`status-badge ${statusClass(status)}`}>{status}</div>

          {status === "거래요청" && (
            <button className="confirm-button" onClick={() => onConfirm(id)}>확인</button>
          )}

          {status === "거래 완료" && (
            <button className="change-button" onClick={onChangeToAvailable}>↔ 거래 가능</button>
          )}
        </div>
        </div>
      </div>

      <div className="right-section">
        {status === "거래가능" && (
          <div className="button-group">
            <button className="edit-button" onClick={handleEdit}>수정</button>
            <button className="delete-button" onClick={onDelete}>삭제</button>
          </div>
        )}

        {status === "대여중" && (
          <div className="button-group">
            <button className="complete-button" onClick={handleReview}>완료</button>
            <button className="report-button" onClick={handleReport}>신고</button>
          </div>
        )}
      </div>
    </div>
    {showReviewModal && (
      <RequestModal
        type={modalType}
        reviewData={reviewData}
        onClose={() => setShowReviewModal(false)}
      />
    )}
    {showReportModal && (
      <RequestModal
        type={modalType}
        reportData={reportData}
        onClose={() => setShowReportModal(false)}
      />
    )}
    </>
  );
};

export default RegisteredItemCard;