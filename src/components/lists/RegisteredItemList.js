import React from "react";
import { useNavigate } from "react-router-dom";
import RegisteredItemCard from "../CardComponents/RegisteredItemCard";
import registeredItems from "../../data/registeredItemsData.json";

const RegisteredItemList = () => {
  const navigate = useNavigate();

  const handleConfirm = (id) => {
    navigate(`/registeredItem/request?id=${id}`);
  };

  return (
    <div>
      {registeredItems.map(item => (
        <RegisteredItemCard
          key={item.id}
          {...item}
          onEdit={() => alert("수정")}
          onDelete={() => alert("삭제")}
          onConfirm={() => handleConfirm(item.id)}
          onComplete={() => alert("완료")}
          onReport={() => alert("신고")}
          onChangeToAvailable={() => alert("거래 가능으로 변경")}
        />
      ))}
    </div>
  );
};

export default RegisteredItemList;