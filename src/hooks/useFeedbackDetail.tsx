import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Feedback } from '../types';

const useFeedbackDetail = (id: string) => {
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const feedbackDoc = await getDoc(doc(db, 'feedback', id));
                if (feedbackDoc.exists()) {
                    const data = feedbackDoc.data();
                    setFeedback({
                        id: feedbackDoc.id,
                        title: data.title,
                        category: data.category,
                        detail: data.detail,
                        status: data.status,
                        numberOfComments: data.numberOfComments,
                        upvotes: data.upvotes
                    });
                } else {
                    setError('Feedback not found');
                }
            } catch (err) {
                setError('Error fetching feedback');
            } finally {
                setLoading(false);
            }
        };

        fetchFeedback();
    }, [id, feedback]);

    return { feedback, loading, error };
};

export default useFeedbackDetail;
