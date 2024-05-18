import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface Feedback {
    id: string;
    title: string;
    category: string;
    detail: string;
    status?: string;
}

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
    }, [id]);

    return { feedback, loading, error };
};

export default useFeedbackDetail;
