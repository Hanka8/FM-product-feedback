import "./noFeedback.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { NoFeedbacksProps } from "../../types";

function NoFeedback({ error }: NoFeedbacksProps): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.15 } }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
    >
      <div className="no-feedbacks">
        <div className="no-feedbacks-img">
          <img
            src="/assets/suggestions/illustration-empty.svg"
            alt="No feedbacks"
          />
        </div>
        {error ? (
          <p className="no-feedbacks-text">{error}</p>
        ) : (
          <>
            <h1 className="no-feedbacks-title">There is no feedback yet.</h1>
            <p className="no-feedbacks-text">
              Got a suggestion? Found a bug that needs to be squashed? We love
              hearing about new ideas to improve our app.
            </p>
          </>
        )}
        <Link className="btn btn-primary" to="/addfeedback">
          + Add Feedback
        </Link>
      </div>
    </motion.div>
  );
}

export default NoFeedback;
