import "./feedbackDetail.css";
import AddComment from "../forms/AddComment/AddComment";
import Error from "../Error";
import Comment from "../Comment/Comment";
import { motion } from "framer-motion";
import { useParams, Link, Navigate } from "react-router-dom";
import useComments from "../../hooks/useComments";
import Feedback from "../Feedback/Feedback";
import ReactLoading from "react-loading";
import { useFeedbackContext } from "../../context/FeedbackContext";


function FeedbackDetail(): JSX.Element {
  const { id } = useParams<{ id: string }>() as { id: string };
  let { comments, errorComments, loadingComments } = useComments(id!);
  const { feedbacks, error, loading } = useFeedbackContext();
  const feedback = feedbacks.find((feedback) => feedback.id === id);

  const idPattern = /^[a-zA-Z0-9]{20}$/;

    if (!idPattern.test(id)) {
      return <Navigate to="/not_found" replace />;
    }

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
              sortedComments.map((comment) => <Comment comment={comment} />)}
          </div>
          <AddComment id={id} />
        </div>
      </section>
    </motion.div>
  );
}

export default FeedbackDetail;
