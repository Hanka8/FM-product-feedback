import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Comment } from '../types';

const useComments = (feedbackId: string) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const commentsCollection = collection(db, 'comments');
        const q = query(commentsCollection, where('feedbackId', '==', feedbackId));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            setLoading(true);
            setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Comment));
            setLoading(false);
        }, () => {
            setError('Error fetching comments');
            setLoading(false);
        });

        return () => unsubscribe();
    }, [feedbackId]);

    return { comments, loading, error };
}

export default useComments;
