import "../styles/feedbacks.css";
import { FeedbacksListProps, Feedback, sortType } from "../types";
import { Link } from "react-router-dom";
import NoFeedbacks from "./NoFeedbacks";
import { useMemo, useEffect } from "react";
import useUpvote from "../hooks/useUpvote";
import useFeedbacks from "../hooks/useFeedbacks";
import { motion } from "framer-motion";

//přidat loading ať to neproblikává

function FeedbacksList({
  setNumberOfFeedbacks,
  sort,
  filter,
}: FeedbacksListProps): JSX.Element {
  const { feedbacks, error, loading } = useFeedbacks();
  const handleUpvote = useUpvote();

  const filteredFeedbacks = useMemo(() => {
    const activeFilter = filter.find((f) => f.isActive);
    if (!activeFilter || activeFilter.label === "All") {
      return feedbacks;
    }
    return feedbacks.filter(
      (feedback) =>
        feedback.category.toLowerCase() === activeFilter.label.toLowerCase()
    );
  }, [filter, feedbacks]);

  const sortedFeedbacks = useMemo(() => {
    return sortFeedbacks(filteredFeedbacks, sort);
  }, [sort, filteredFeedbacks]);

  function sortFeedbacks(feedbacks: Feedback[], sort: sortType): Feedback[] {
    const sortedFeedbacks: Feedback[] = [...feedbacks];
    switch (sort) {
      case "most-upvotes":
        return sortedFeedbacks.sort((a, b) => b.upvotes - a.upvotes);
      case "least-upvotes":
        return sortedFeedbacks.sort((a, b) => a.upvotes - b.upvotes);
      case "most-comments":
        return sortedFeedbacks.sort(
          (a, b) => b.numberOfComments - a.numberOfComments
        );
      case "least-comments":
        return sortedFeedbacks.sort(
          (a, b) => a.numberOfComments - b.numberOfComments
        );
      default:
        return sortedFeedbacks;
    }
  }

  useEffect(() => {
    setNumberOfFeedbacks(sortedFeedbacks.length);
  }, [sortedFeedbacks, setNumberOfFeedbacks]);

  return (
    <div className="feedbacks">
      {sortedFeedbacks.length > 0 && !loading ? (
        sortedFeedbacks.map((feedback) => (
          <motion.div
            key={feedback.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.15 } }}
          >
            <Link to={`/${feedback.id}`} key={feedback.id}>
              <div key={feedback.id} className="feedback">
                <div className="flex-start">
                  <button
                    className="btn btn-upvote"
                    onClick={(e) => handleUpvote(feedback, e)}
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
                  <img
                    src="assets/shared/icon-comments.svg"
                    alt="comments ico"
                  />
                  <p className="comments-num">{feedback.numberOfComments}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))
      ) : (
        <NoFeedbacks error={error} />
      )}
    </div>
  );
}

export default FeedbacksList;
