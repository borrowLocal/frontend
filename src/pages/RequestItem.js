import React from "react";
import { useSearchParams } from "react-router-dom";
import registeredItems from "../data/registeredItemsData.json";
import RequestItemCard from "../components/cards/RequestItemCard";
import ProfileCard from "../components/cards/ProfileCard";
import "../styles/RequestItem.css";

const RequestItem = () => {
  const [searchParams] = useSearchParams();
  const id = parseInt(searchParams.get("id"), 10);

  const item = registeredItems.find((i) => i.id === id);

  if (!item) {
    return <div>해당 물품을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="request-item-detail-container">
      <RequestItemCard item={item} />
      <hr/>
      <h3>대여 신청자 정보</h3>
      <ProfileCard />
    </div>
  );
};

export default RequestItem;
