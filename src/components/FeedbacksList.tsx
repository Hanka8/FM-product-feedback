import {
  FeedbacksListProps,
  Feedback as FeedbackType,
  sortType,
} from "../types";
import { Link } from "react-router-dom";
import NoFeedbacks from "./NoFeedback/NoFeedback";
import ReactLoading from "react-loading";
import { useMemo, useEffect } from "react";
import Feedback from "./Feedback/Feedback";
import { motion } from "framer-motion";
import { useFeedbackContext } from "../context/FeedbackContext";

function FeedbacksList({
  setNumberOfFeedbacks,
  filters,
  sort,
}: FeedbacksListProps): JSX.Element {
  const { feedbacks, error, loading } = useFeedbackContext();

  const filteredFeedbacks = useMemo(() => {
    return feedbacks.filter((feedback) => {
      const { all, ui, ux, enhancement, bug, feature } = filters;
      if (all) return true;
      if (ui && feedback.category === "ui") return true;
      if (ux && feedback.category === "ux") return true;
      if (enhancement && feedback.category === "enhancement") return true;
      if (bug && feedback.category === "bug") return true;
      if (feature && feedback.category === "feature") return true;
      return false;
    });
  }, [filters, feedbacks]);

  const sortedFeedbacks = useMemo(() => {
    return sortFeedbacks(filteredFeedbacks, sort);
  }, [feedbacks, sort, filteredFeedbacks]);

  function sortFeedbacks(
    feedbacks: FeedbackType[],
    sort: sortType
  ): FeedbackType[] {
    let sortedFeedbacks: FeedbackType[] = [...feedbacks];
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
      {(error || (filteredFeedbacks.length === 0 && !loading)) && (
        <NoFeedbacks error={error} />
      )}
      {loading && (
        <ReactLoading
          className="loading"
          type={"spokes"}
          color={"#373f68"}
          height={667}
          width={40}
        />
      )}
      {sortedFeedbacks.length > 0 &&
        !loading &&
        sortedFeedbacks.map((feedback) => (
          <motion.div
            key={feedback.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.15 } }}
          >
            <Link to={`/${feedback.id}`} key={feedback.id}>
              <div key={feedback.id} className="feedback">
                <Feedback
                  feedback={feedback}
                  status={feedback.status}
                  roadmap={false}
                />
              </div>
            </Link>
          </motion.div>
        ))}
    </div>
  );
}

export default FeedbacksList;
