import React, { useState } from "react";
import RegisteredItemCard from "../cards/RegisteredItemCard";
import RequestModal from "../RequestModal/RequestModal";
import registeredItems from "../../data/registeredItemsData.json";

const RegisteredItemList = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleConfirm = (id) => {
    setSelectedItemId(id);
    setModalType('rental');
    setShowModal(true);
  };

  const handleReview = () => {
    setModalType('review');
    setShowModal(true);
  };

  const handleReport = () => {
    setModalType('report');
    setShowModal(true);
  };

  return (
    <>
      <div>
        {registeredItems.map(item => (
          <RegisteredItemCard
            key={item.id}
            {...item}
            onEdit={() => alert("수정")}
            onDelete={() => alert("삭제")}
            onConfirm={() => handleConfirm(item.id)}
            onComplete={handleReview}
            onReport={handleReport}
            onChangeToAvailable={() => alert("거래 가능으로 변경")}
          />
        ))}
      </div>
      {showModal && (
        <RequestModal
          type={modalType}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default RegisteredItemList;