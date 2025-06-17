import './styles/ReviewCard.css';

const ReviewCard = ({ title, rating, comments, date }) => {
    const getDaysAgo = (createdAt) => {
        const createdDate = new Date(createdAt);
        const today = new Date();
      
        // 시/분/초 제거 (날짜만 비교)
        createdDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
      
        const diffTime = today - createdDate; // 두 날짜의 차이를 밀리초 단위로 계산
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // 밀리초를 일(day) 단위로 변환
      
        if (diffDays === 0) return "오늘";
        if (diffDays === 1) return "어제";
        return `${diffDays}일 전`;
      };
  
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
                <p>{comments}</p>
            </div>
            <div className="review-date">{getDaysAgo(date)}</div>
        </div>
    </div>
  );
};

export default ReviewCard;
