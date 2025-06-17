import React, { useState, useEffect } from "react";
import ReviewCard from "../cards/ReviewCard";
import axios from "axios";

const ReviewCardList = ({ type }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          setError("로그인이 필요합니다.");
          return;
        }

        const endpoint = type === "written" 
          ? `http://localhost:8080/reviews/written/${userId}`
          : `http://localhost:8080/reviews/received/${userId}`;

        const response = await axios.get(endpoint, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log(response.data);

        if (response.status === 200) {
          setReviews(response.data);
        }
      } catch (err) {
        if (err.response) {
          setError("리뷰를 불러오는데 실패했습니다.");
        } else if (err.request) {
          setError("서버에 연결할 수 없습니다.");
        } else {
          setError("리뷰 조회 중 오류가 발생했습니다.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [type]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div>
      {reviews.map((review) => (
        <ReviewCard
          key={review.review_id}
          title={review.item_title}
          rating={review.rating}
          comments={review.content}
          date={review.created_at}
        />
      ))}
    </div>
  );
};

export default ReviewCardList;
