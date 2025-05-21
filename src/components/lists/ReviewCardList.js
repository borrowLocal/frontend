import React from "react";
import ReviewCard from "../CardComponents/ReviewCard";
import mockReviewData from "../../data/mockReviewData.json";

const ReviewCardList = ({ type }) => {
  const filteredReviews = mockReviewData.filter(
    (review) => review.type === type
  );

  return (
    <div>
      {filteredReviews.map((review) => (
        <ReviewCard
          key={review.id}
          title={review.title}
          rating={review.rating}
          comments={review.comments}
          date={review.date}
        />
      ))}
    </div>
  );
};

export default ReviewCardList;
