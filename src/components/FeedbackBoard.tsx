import '../styles/feedbackBoard.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import Feedbacks from './Feedbacks';

interface FeedbackBoardProps {
    all: boolean;
    ui: boolean;
    ux: boolean;
    enhancement: boolean;
    bug: boolean;
    feature: boolean;
}

function FeedbackBoard({all, ui, ux, enhancement, bug, feature} : FeedbackBoardProps): JSX.Element {

    const [numberOfFeedbacks, setNumberOfFeedbacks] = useState<number>(0);

    useEffect(() => {
        const feedbacksCollection = collection(db, 'feedback');
        const unsubscribe = onSnapshot(feedbacksCollection, (snapshot) => {
            setNumberOfFeedbacks(snapshot.docs.length);
        });

        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <div className='feedback-board'>
            <header className='board-header'>
                <p className='header-number'>{`${numberOfFeedbacks} suggestions`}</p>
                <Link className='btn btn-primary' to='/addfeedback'>+ Add Feedback</Link>
            </header>
                <Feedbacks
                    setNumberOfFeedbacks={setNumberOfFeedbacks}
                    all={all}
                    ui={ui}
                    ux={ux}
                    enhancement={enhancement}
                    bug={bug}
                    feature={feature}
                />
        </div>
    )
}

export default FeedbackBoard;