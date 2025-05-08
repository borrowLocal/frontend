import React from "react";
import RegisteredItemCard from "../CardComponents/RegisteredItemCard";
import registeredItems from "../../data/registeredItemsData.json";

const RegisteredItemList = () => {
  return (
    <div>
      {registeredItems.map((item, index) => (
        <RegisteredItemCard
          key={index}
          {...item}
          onEdit={() => alert("수정")}
          onDelete={() => alert("삭제")}
          onConfirm={() => alert("확인")}
          onComplete={() => alert("완료")}
          onReport={() => alert("신고")}
          onChangeToAvailable={() => alert("거래 가능으로 변경")}
        />
      ))}
    </div>
  );
};

export default RegisteredItemList;