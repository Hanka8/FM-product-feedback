import FilteringPanel from './FilteringPanel';
import FeedbackBoard from './FeedbackBoard';
import '../styles/landing.css';

function Landing(): JSX.Element {
    return (
        <div className='landing'>  
            <FilteringPanel />
            <FeedbackBoard />
        </div>
    )
}

export default Landing;