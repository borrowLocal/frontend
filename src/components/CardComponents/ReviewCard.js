import './styles/ReviewCard.css';

const ReviewCard = ({ title, rating, comments, date }) => {
  return (
    <div className="review-card">
        <div className="review-card-header">
            <span className="review-title">{title}</span>
            <span className="review-stars">
                ★ ({rating}/9)
            </span>
        </div>
        <div className="review-card-body">
            <div className="review-comments">
                {comments.map((comment, idx) => (
                <p key={idx}>{comment}</p>
                ))}
            </div>
            <div className="review-date">{date}일 전</div>
        </div>
    </div>
  );
};

export default ReviewCard;
