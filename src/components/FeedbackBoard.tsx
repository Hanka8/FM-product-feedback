import '../styles/feedbackBoard.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import NoFeedbacks from './NoFeedbacks';

function FeedbackBoard(): JSX.Element {

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
                <Link className='header-addbtn' to='/addfeedback'>+ Add Feedback</Link>
            </header>
            {numberOfFeedbacks === 0 ? <NoFeedbacks /> : <p>there are some feedbacks</p>}
        </div>
    )
}

export default FeedbackBoard;