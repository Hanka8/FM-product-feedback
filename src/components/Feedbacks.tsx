import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import '../styles/feedbacks.css';

function Feedbacks(): JSX.Element {

    interface Feedback {
        id: string;
        title: string;
        category: string;
        detail: string;
    }

    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

    useEffect(() => {
        const feedbacksCollection = collection(db, 'feedback');
        const unsubscribe = onSnapshot(feedbacksCollection, (snapshot) => {
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
            console.log(feedbacks);
        });

        return () => {
            unsubscribe();
        }
    }, []);


    return (
        <div className='feedbacks'>
            {feedbacks.map((feedback) => (
                <div key={feedback.id} className='feedback'>
                    <p>{feedback.title}</p>
                    <p>{feedback.category}</p>
                    <p>{feedback.detail}</p>
                </div>
            ))}
        </div>
    )
}

export default Feedbacks;