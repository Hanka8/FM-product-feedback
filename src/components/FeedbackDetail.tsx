import { useParams } from "react-router-dom";
import useFeedbackDetail from "../hooks/useFeedbackDetail";
import "../styles/feedbacks.css";
import "../styles/feedbackDetail.css";
import GoBack from "./utils/GoBack";

function FeedbackDetail(): JSX.Element {

    const { id } = useParams<{ id: string }>();
    const { feedback, loading, error } = useFeedbackDetail(id!);

    return (
        <section id="feedbackDetail">
            <div className="container">
                <div className="buttons">
                    <GoBack />
                    <button className="btn btn-primary">Edit Feedback</button>
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
            </div>
        </section>
    )
}

export default FeedbackDetail;