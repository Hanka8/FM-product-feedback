import { Link } from 'react-router-dom';
import '../styles/noFeedbacks.css';

function NoFeedbacks(): JSX.Element {
    return (
        <div className='no-feedbacks'>
            <div className='no-feedbacks-img'>
                <img src='/assets/suggestions/illustration-empty.svg' alt='No feedbacks' />
            </div>
            <h1 className='no-feedbacks-title'>There is no feedback yet.</h1>
            <p className='no-feedbacks-text'>Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</p>
            <Link className='header-addbtn' to='/addfeedback'>+ Add Feedback</Link>
        </div>
    )
}

export default NoFeedbacks;