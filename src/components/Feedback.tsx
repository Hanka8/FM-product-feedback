import "../styles/feedbacks.css";
import { Link } from "react-router-dom";
import { FeedbackProps } from "../types";
import handleUpvote from "./functions/handleUpvote";

function Feedback({ feedback, status }: FeedbackProps): JSX.Element {
  return (
    <Link to={`/${feedback.id}`} key={feedback.id}>
      <div key={feedback.id} className={`roadmap-feedback ${status}`}>
        <p className="feedback-state">
          <span className={`circle ${status}`}></span>Planned
        </p>
        <p className="feedback-title">{feedback.title}</p>
        <p className="feedback-detail">{feedback.detail}</p>
        <p className="feedback-category">{feedback.category}</p>
        <div className="flex-between roadmap-upvotes-comments">
          <button
            className="btn btn-upvote"
            onClick={(e) => handleUpvote(feedback, e)}
          >
            {feedback.upvotes}
          </button>
          <div className="feedback-comments">
            <img src="assets/shared/icon-comments.svg" alt="comments ico" />
            <p className="comments-num">{feedback.numberOfComments}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Feedback;
