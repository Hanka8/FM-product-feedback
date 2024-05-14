import { useParams } from "react-router-dom";

function FeedbackDetail(): JSX.Element {

    const { id } = useParams<{ id: string }>();

    return (
        <div>
            <h1>Feedback Detail</h1>
            <p>Feedback ID: {id}</p>
        </div>
    )
}

export default FeedbackDetail;