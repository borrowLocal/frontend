import "./styles/RequestItemCard.css";

const RequestItemCard = ({ item, onAccept, onReject }) => {
  return (
    <div className="request-item-card">
      <div className="item-header">
        <img className="request-item-image" src={`http://localhost:8080${item.itemImage}`} />
        <div className="request-item-details">
          <p className="req-item-name">{item.itemName} ({item.quantity}개)</p>
          <p className="req-item-cost">
            {item.rentPrice.toLocaleString()}원/일 
            <span>(보증금 {item.depositAmount.toLocaleString()}원)</span>
          </p>
          <p>희망 대여 기간 : {item.rentStart} ~ {item.rentEnd}</p>
          <p>대여 희망 일시 : {new Date(item.pickupTime).toLocaleString()}</p>
          <p>반납 희망 일시 : {new Date(item.returnTime).toLocaleString()}</p>
          <p>희망 거래 장소 : {item.meetingPlace}</p>
        </div>
      </div>
      <div className="button-row">
        <button className="accept-button" onClick={onAccept}>수락</button>
        <button className="reject-button" onClick={onReject}>거절</button>
      </div>
    </div>
  );
};

export default RequestItemCard;
