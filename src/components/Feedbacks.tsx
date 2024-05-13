import { useEffect, useState } from 'react';
import { query, collection, onSnapshot, where } from 'firebase/firestore';
import { db } from '../firebase';
import '../styles/feedbacks.css';

interface FeedbacksProps {
    all: boolean;
    ui: boolean;
    ux: boolean;
    enhancement: boolean;
    bug: boolean;
    feature: boolean;
}

interface Feedback {
    id: string;
    title: string;
    category: string;
    detail: string;
}

function Feedbacks({all, ui, ux, enhancement, bug, feature} : FeedbacksProps): JSX.Element {

    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

    console.log(all, ui, ux, enhancement, bug, feature);

    useEffect(() => {
        const feedbacksCollection = collection(db, 'feedback');
        let queryFilters = [];

        if (!all) {
            if (ui) queryFilters.push(where('category', '==', 'ui'));
            if (ux) queryFilters.push(where('category', '==', ''));
            if (enhancement) queryFilters.push(where('category', '==', 'enhancement'));
            if (bug) queryFilters.push(where('category', '==', 'bug'));
            if (feature) queryFilters.push(where('category', '==', 'feature'));
        }

        const filteredQuery = query(feedbacksCollection, ...queryFilters);

        const unsubscribe = onSnapshot(filteredQuery, (snapshot) => {
            let feedbacks: Feedback[] = [];
            snapshot.docs.forEach(doc => {
                feedbacks.push({
                    id: doc.id,
                    title: doc.data().title,
                    category: doc.data().category,
                    detail: doc.data().detail
                });
            });
            setFeedbacks(feedbacks);
        });


        return () => {
            unsubscribe();
        }
    }, [all, ui, ux, enhancement, bug, feature]);

    return (
        <div className='feedbacks'>
            {feedbacks.map((feedback) => (
                <div key={feedback.id} className='feedback'>
                    <div className='feedback-info'>
                        <p className='feedback-title'>{feedback.title}</p>
                        <p className='feedback-detail'>{feedback.detail}</p>
                        <p className='feedback-category'>{feedback.category}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Feedbacks;