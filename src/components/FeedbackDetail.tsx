import { useParams, Link } from "react-router-dom";
import useFeedbackDetail from "../hooks/useFeedbackDetail";
import useComments from "../hooks/useComments";
import "../styles/comment.css";
import "../styles/feedbacks.css";
import "../styles/feedbackDetail.css";
import GoBack from "./utils/GoBack";
import AddComment from "./AddComment";

function FeedbackDetail(): JSX.Element {

    const { id } = useParams<{ id: string }>() as { id: string };

    const { feedback, loading, error } = useFeedbackDetail(id!);
    let { comments, loading: commentsLoading, error: commentsError } = useComments(id!);

    return (
        <section id="feedbackDetail">
            <div className="container">
                <div className="buttons">
                    <GoBack />
                    <Link to={`/${id}/editfeedback`}>
                        <button className="btn btn-primary">Edit Feedback</button>
                    </Link>
                </div>
                <div className='feedback'>
                    {loading && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                    {feedback && (
                        <div className='feedback-info'>
                            <p className='feedback-title'>{feedback.title}</p>
                            <p className='feedback-detail'>{feedback.detail}</p>
                            <p className='feedback-category'>{feedback.category}</p>
                        </div>
                    )}
                </div>
                <div className='comments'>
                    <h2 className="comment-heading">Comments</h2>
                    {commentsLoading && <p>Loading comments...</p>}
                    {commentsError && <p>{commentsError}</p>}
                    {comments.map(comment => (
                        <div key={comment.id} className='comment'>
                            <p>{comment.comment}</p>
                        </div>
                    ))}
                </div>
                <AddComment id={id} />
            </div>
            
        </section>
    )
}

export default FeedbackDetail;