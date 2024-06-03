import "../styles/feedbacks.css";
import { FeedbackProps } from "../types";
import handleUpvote from "../functions/handleUpvote";
import { useState } from "react";

function Feedback({ feedback, status, roadmap }: FeedbackProps): JSX.Element {
  const [upvoted, setUpvoted] = useState<boolean>(
    localStorage.getItem(feedback.id) ? true : false
  );

  return (
    <>
      {roadmap ? (
        <div key={feedback.id} className={`roadmap-feedback ${status}`}>
          <p className="feedback-state">
            <span className={`circle ${status}`}></span>Planned
          </p>
          <p className="feedback-title">{feedback.title}</p>
          <p className="feedback-detail">{feedback.detail}</p>
          <p className="feedback-category">{feedback.category}</p>
          <div className="flex-between roadmap-upvotes-comments">
            <button
              className={`btn btn-upvote ${upvoted ? "upvoted" : ""}`}
              onClick={(e) => {
                handleUpvote(feedback, e);
                if (!upvoted) {
                  setUpvoted(true);
                } else {
                  setUpvoted(false);
                }
              }}
            >
              {feedback.upvotes}
            </button>
            <div className="feedback-comments">
              <img src="assets/shared/icon-comments.svg" alt="comments ico" />
              <p className="comments-num">{feedback.numberOfComments}</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-start">
            <button
              className={`btn btn-upvote ${upvoted ? "upvoted" : ""}`}
              onClick={(e) => {
                handleUpvote(feedback, e);
                if (!upvoted) {
                  setUpvoted(true);
                } else {
                  setUpvoted(false);
                }
              }}
            >
              {feedback.upvotes}
            </button>
            <div className="feedback-info">
              <p className="feedback-title">{feedback.title}</p>
              <p className="feedback-detail">{feedback.detail}</p>
              <p className="feedback-category">{feedback.category}</p>
            </div>
          </div>
          <div className="feedback-comments">
            <img src="assets/shared/icon-comments.svg" alt="comments ico" />
            <p className="comments-num">{feedback.numberOfComments}</p>
          </div>
        </>
      )}
    </>
  );
}

export default Feedback;