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

  useEffect(() => {
    fetchApplicants();
  }, [id]);

  const handleAccept = async (rentalId) => {
    try {
      await axios.put(`http://localhost:8080/rentals/status/approve/${rentalId}`);
      await fetchApplicants(); // 다시 목록 불러오기
    } catch (err) {
      console.error('수락 처리 중 오류:', err);
      setError('수락 처리 중 오류가 발생했습니다.');
    }
  };

  const handleReject = async (rentalId) => {
    try {
      await axios.put(`http://localhost:8080/rentals/status/reject/${rentalId}`);
      await fetchApplicants(); // 다시 목록 불러오기
    } catch (err) {
      console.error('거절 처리 중 오류:', err);
      setError('거절 처리 중 오류가 발생했습니다.');
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="request-item-detail-container">
      {applicants.length === 0 ? (
        <div className="no-applicants-message">신청자가 없습니다.</div>
      ) : (
      applicants.map((applicant) => (
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
        ))
      )}
    </div>
  );
};

export default RequestItem;
