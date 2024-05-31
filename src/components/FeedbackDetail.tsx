import "../styles/comment.css";
import "../styles/feedbacks.css";
import "../styles/feedbackDetail.css";
import GoBack from "./utils/GoBack";
import AddComment from "./AddComment";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import useFeedbackDetail from "../hooks/useFeedbackDetail";
import useComments from "../hooks/useComments";
import handleUpvote from "./functions/handleUpvote";

function FeedbackDetail(): JSX.Element {
  const { id } = useParams<{ id: string }>() as { id: string };
  let feedback = useFeedbackDetail(id!);
  let { comments } = useComments(id!);

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
            {feedback && (
              <>
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
                  <p className="comments-num">{comments.length}</p>
                </div>
              </>
            )}
          </div>
          <div className="comments">
            <h2 className="comment-heading">
              {comments.length == 0 ? "No comments yet" : "Comments"}
            </h2>
            {comments.map((comment) => (
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
