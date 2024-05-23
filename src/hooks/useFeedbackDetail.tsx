import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Feedback } from '../types';

const useFeedbackDetail = (id: string) => {
    const [feedback, setFeedback] = useState<Feedback | null>(null);

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
                    console.error('No such document');
                }
            } catch (err) {
                console.error('Error fetching feedback: ', err);
            } 
        };

        fetchFeedback();
    }, [id, feedback]);

    return feedback;
};

export default useFeedbackDetail;
