import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { Comment } from '../types';

const useComments = (feedbackId: string) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const commentsCollection = collection(db, 'comments');
                const commentsSnapshot = await getDocs(query(commentsCollection, where('feedbackId', '==', feedbackId)));
                setComments(commentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Comment));
            } catch (err) {
                setError('Error fetching comments');
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [feedbackId, comments]);

    return { comments, loading, error };
}

export default useComments;