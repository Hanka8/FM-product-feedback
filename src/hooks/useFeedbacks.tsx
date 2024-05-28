import { Feedback } from '../types';
import { collection, onSnapshot} from 'firebase/firestore';
import { db } from '../firebase';
import { useState, useEffect } from 'react';

const useFeedbacks = () => {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const feedbacksCollection = collection(db, 'feedback');
        setLoading(true);
        const unsubscribe = onSnapshot(feedbacksCollection, (snapshot) => {
            let feedbacks: Feedback[] = [];
            snapshot.docs.forEach(doc => {
                feedbacks.push({
                    id: doc.id,
                    title: doc.data().title,
                    category: doc.data().category,
                    detail: doc.data().detail,
                    numberOfComments: doc.data().numberOfComments,
                    upvotes: doc.data().upvotes,
                    status: doc.data().status
                });
            });
            setFeedbacks(feedbacks);
            setLoading(false);
        }, () => {
            setError('Error fetching feedbacks');
            }
        );
        return () => {
            unsubscribe();
        }
    }, []);

    return {feedbacks, error, loading};
}

export default useFeedbacks;