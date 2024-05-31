import { Feedback } from '../../types';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { MouseEvent } from 'react';

export default async function handleUpvote(feedback: Feedback, e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        try {
            await updateDoc(doc(db, 'feedback', feedback.id), {
                upvotes: feedback.upvotes + 1
            });
        } catch (err) {
            console.error('Failed to update upvote:', err);
        }
};

