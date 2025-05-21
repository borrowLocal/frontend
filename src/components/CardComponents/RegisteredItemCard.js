import "./styles/RegisteredItemCard.css";

const statusClass = (status) => {
  switch (status) {
    case "거래 가능":
      return "badge-available";
    case "거래 요청":
      return "badge-requested";
    case "대여 중":
      return "badge-renting";
    case "거래 완료":
      return "badge-complete";
    default:
      return "";
  }
};

const RegisteredItemCard = ({
  id,
  itemName,
  currentAmount,
  totalAmount,
  dailyFee,
  deposit,
  description,
  imageUrl,
  status,
  onEdit,
  onDelete,
  onConfirm,
  onComplete,
  onReport,
  onChangeToAvailable
}) => {
  return (
    <div className="registered-card">
      <div className="register-left-section">
        <div>
          <img
            className="registered-item-image" />
        </div>
        <div className="registered-item-info">
          <div className="item-title">{`${itemName} (${currentAmount}/${totalAmount}개)`}</div>
          <div className="price-info">{`${dailyFee.toLocaleString()}원/일 (보증금 ${deposit.toLocaleString()}원)`}</div>
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

          {status === "거래 요청" && (
            <button className="confirm-button" onClick={() => onConfirm(id)}>확인</button>
          )}

          {status === "거래 완료" && (
            <button className="change-button" onClick={onChangeToAvailable}>↔ 거래 가능</button>
          )}
        </div>
        </div>
      </div>

      <div className="right-section">
        {status === "거래 가능" && (
          <div className="button-group">
            <button className="edit-button" onClick={onEdit}>수정</button>
            <button className="delete-button" onClick={onDelete}>삭제</button>
          </div>
        )}

        {status === "대여 중" && (
          <div className="button-group">
            <button className="complete-button" onClick={onComplete}>완료</button>
            <button className="report-button" onClick={onReport}>신고</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisteredItemCard;