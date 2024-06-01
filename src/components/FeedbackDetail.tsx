import "../styles/comment.css";
import "../styles/feedbacks.css";
import "../styles/feedbackDetail.css";
import GoBack from "./utils/GoBack";
import AddComment from "./AddComment";
import Error from "./Error";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import useFeedbackDetail from "../hooks/useFeedbackDetail";
import useComments from "../hooks/useComments";
import Feedback from "./Feedback";
import ReactLoading from "react-loading";

function FeedbackDetail(): JSX.Element {
  const { id } = useParams<{ id: string }>() as { id: string };
  let { feedback, errorDetail, loadingDetail } = useFeedbackDetail(id!);
  let { comments, errorComments, loadingComments } = useComments(id!);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.25 } }}
    >
      <section id="feedbackDetail">
        <div className="container">
          <div className="buttons">
            <GoBack />
            <Link to={`/${id}/editfeedback`}>
              <button className="btn btn-quaternary ">Edit Feedback</button>
            </Link>
          </div>
          <div className="feedback">
            {errorDetail && <Error error={errorDetail} />}
            {loadingDetail && (
              <ReactLoading
                className="loading loading-detail"
                type={"spokes"}
                color={"#373f68"}
                height={50}
                width={40}
              />
            )}
            {(feedback && !loadingDetail) && (
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
            {(comments && !loadingComments) && comments.map((comment) => (
              <div key={comment.id} className="comment">
                <p>{comment.comment}</p>
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
