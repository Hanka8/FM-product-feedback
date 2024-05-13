import { useEffect, useState } from 'react';
import { query, collection, onSnapshot, where, Query } from 'firebase/firestore';
import { db } from '../firebase';
import '../styles/feedbacks.css';
import NoFeedbacks from './NoFeedbacks';

interface FeedbacksProps {
    setNumberOfFeedbacks: (num: number) => void;
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

function Feedbacks({ setNumberOfFeedbacks, all, ui, ux, enhancement, bug, feature }: FeedbacksProps): JSX.Element {

    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

    useEffect(() => {
        const feedbacksCollection = collection(db, 'feedback');
        let queryFilters: any[] = [];

        if (!all) {
            const selectedCategories: string[] = [];
            if (ui) selectedCategories.push('ui');
            if (ux) selectedCategories.push('ux');
            if (enhancement) selectedCategories.push('enhancement');
            if (bug) selectedCategories.push('bug');
            if (feature) selectedCategories.push('feature');

            if (selectedCategories.length > 0) {
                const categoryFilter = where('category', 'in', selectedCategories);
                queryFilters.push(categoryFilter);
            }
        }

        const filteredQuery: Query = query(feedbacksCollection, ...queryFilters);

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
            setNumberOfFeedbacks(feedbacks.length);
        });

        return () => {
            unsubscribe();
        }
    }, [all, ui, ux, enhancement, bug, feature, setNumberOfFeedbacks]);

    return (
        <div className='feedbacks'>
            {feedbacks.length > 0 ? feedbacks.map((feedback) => (
                <div key={feedback.id} className='feedback'>
                    <div className='feedback-info'>
                        <p className='feedback-title'>{feedback.title}</p>
                        <p className='feedback-detail'>{feedback.detail}</p>
                        <p className='feedback-category'>{feedback.category}</p>
                    </div>
                </div>
            )) : <NoFeedbacks />}
        </div>
    )
}

export default Feedbacks;
