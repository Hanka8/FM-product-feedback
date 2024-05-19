import { useParams, Link } from "react-router-dom";
import useFeedbackDetail from "../hooks/useFeedbackDetail";
import "../styles/feedbacks.css";
import "../styles/feedbackDetail.css";
import GoBack from "./utils/GoBack";
import AddComment from "./AddComment";

function FeedbackDetail(): JSX.Element {

    const { id } = useParams<{ id: string }>() as { id: string };
    const { feedback, loading, error } = useFeedbackDetail(id!);

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
                <AddComment id={id} />
            </div>
            
        </section>
    )
}

export default FeedbackDetail;