import "../styles/comment.css";
import "../styles/feedbacks.css";
import "../styles/feedbackDetail.css";
import AddComment from "./forms/AddComment";
import Error from "./Error";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import useComments from "../hooks/useComments";
import Feedback from "./Feedback";
import ReactLoading from "react-loading";
import { useFeedbackContext } from "./context/FeedbackContext";

function FeedbackDetail(): JSX.Element {
  const { id } = useParams<{ id: string }>() as { id: string };
  let { comments, errorComments, loadingComments } = useComments(id!);
  const { feedbacks, error, loading } = useFeedbackContext();
  const feedback = feedbacks.find((feedback) => feedback.id === id);

  const sortedComments = comments.sort(
    (a, b) => a.timestamp.toDate() - b.timestamp.toDate()
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.25 } }}
    >
      <section id="feedbackDetail">
        <div className="container">
          <div className="buttons">
            <Link to="/">
              <button className="go-back">Go Back</button>
            </Link>
            <Link to={`/${id}/editfeedback`}>
              <button className="btn btn-quaternary ">Edit Feedback</button>
            </Link>
          </div>
          <div className="feedback">
            {error && <Error error={error} />}
            {loading && (
              <ReactLoading
                className="loading loading-detail"
                type={"spokes"}
                color={"#373f68"}
                height={50}
                width={40}
              />
            )}
            {feedback && !loading && (
              <Feedback
                feedback={feedback}
                status={feedback.status}
                roadmap={false}
              />
            )}
          </div>
          <div className="comments">
            <h2 className="comment-heading">
              {comments.length == 0 ? "No comments yet" : "Comments"}
            </h2>
            {errorComments && <Error error={errorComments} />}
            {loadingComments && (
              <ReactLoading
                className="loading loading-comments"
                type={"spokes"}
                color={"#373f68"}
                height={50}
                width={40}
              />
            )}
            {sortedComments &&
              !loadingComments &&
              sortedComments.map((comment) => (
                <div key={comment.id} className="comment">
                  <div className="avatar-container">
                    <img
                      className="avatar"
                      src="assets/shared/avatar.webp"
                      alt="avatar"
                    />
                  </div>
                  <div>
                    <p className="user bold dark-blue">Anonymous user</p>
                    <p>{comment.comment}</p>
                  </div>
                </div>
              ))}
          </div>
          <AddComment id={id} />
        </div>
      </section>
    </motion.div>
  );
}

export default FeedbackDetail;
