import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import RequestItemCard from "../components/cards/RequestItemCard";
import ProfileCard from "../components/cards/ProfileCard";
import "../styles/RequestItem.css";

const RequestItem = () => {
  const [searchParams] = useSearchParams();
  const id = parseInt(searchParams.get("id"), 10);
  const [applicants, setApplicants] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/rentals/applicants/${id}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        });
        setApplicants(response.data);
        setError(null);
      } catch (err) {
        console.error('신청자 목록을 불러오는데 실패했습니다:', err);
        setError('신청자 목록을 불러오는데 실패했습니다.');
      }
    };

    fetchApplicants();
  }, [id]);

  const handleAccept = async (rentalId) => {
    // TODO: 수락 API 구현
    console.log('수락:', rentalId);
  };

  const handleReject = async (rentalId) => {
    // TODO: 거절 API 구현
    console.log('거절:', rentalId);
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="request-item-detail-container">     
      {applicants.map((applicant) => (
        <div key={applicant.rental_id}>
          <RequestItemCard 
            item={{
              itemName: applicant.title,
              rentPrice: applicant.price_per_day,
              depositAmount: applicant.deposit_amount,
              rentStart: applicant.start_date,
              rentEnd: applicant.end_date,
              pickupTime: applicant.meeting_time,
              returnTime: applicant.expected_return_at,
              meetingPlace: applicant.meeting_location,
              quantity: applicant.rental_quantity,
              status: applicant.rental_status
            }}
            onAccept={() => handleAccept(applicant.rental_id)}
            onReject={() => handleReject(applicant.rental_id)}
          />
          <ProfileCard 
            ownerData={{
              owner_nick_name: applicant.nick_name,
              owner_rating: applicant.rating
            }}
          />
          <br/>
          <hr/>
        </div>
      ))}
    </div>
  );
};

export default RequestItem;
