import '../styles/feedbacks.css';
import { FeedbacksProps, Feedback, Sort } from '../types';
import { query, collection, onSnapshot, where, Query } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import NoFeedbacks from './NoFeedbacks';
import { useEffect, useState, useMemo } from 'react';
import useUpvote from '../hooks/useUpvote';
import { motion } from 'framer-motion';

function Feedbacks({ setNumberOfFeedbacks, all, ui, ux, enhancement, bug, feature, sort }: FeedbacksProps): JSX.Element {

    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const handleUpvote = useUpvote();

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
                    detail: doc.data().detail,
                    numberOfComments: doc.data().numberOfComments,
                    upvotes: doc.data().upvotes,
                    status: doc.data().status
                });
            });
            setFeedbacks(feedbacks);
            setNumberOfFeedbacks(feedbacks.length);
        });

        return () => {
            unsubscribe();
        }
    }, [all, ui, ux, enhancement, bug, feature, setNumberOfFeedbacks]);

    const sortedFeedbacks = useMemo(() => {
        return sortFeedbacks(feedbacks, sort);
    }, [feedbacks, sort]);

    function sortFeedbacks(feedbacks: Feedback[], sort: Sort): Feedback[] {
        let sortedFeedbacks: Feedback[] = feedbacks;
        switch(sort) {
            case "most-upvotes":
                return sortedFeedbacks.sort((a, b) => b.upvotes - a.upvotes);
            case "least-upvotes":
                return sortedFeedbacks.sort((a, b) => a.upvotes - b.upvotes);
            case "most-comments":
                return sortedFeedbacks.sort((a, b) => b.numberOfComments - a.numberOfComments);
            case "least-comments":
                return  sortedFeedbacks.sort((a, b) => a.numberOfComments - b.numberOfComments);
            default:
                return sortedFeedbacks;
        }
    }

    return (

        <div className='feedbacks'>
            {feedbacks.length > 0 ? sortedFeedbacks.map((feedback) => (
                <motion.div
                    initial={{opacity: 0}} 
                    animate={{opacity: 1, transition: {duration: 0.15}}}>
                    <Link to={`/${feedback.id}`} key={feedback.id}  state={{ some: "value"}}>
                        <div key={feedback.id} className='feedback'>
                        <div className="flex-start">
                                <button className="btn btn-upvote" onClick={(e) => handleUpvote(feedback, e)}>{feedback.upvotes}</button>
                                <div className='feedback-info'>
                                    <p className='feedback-title'>{feedback.title}</p>
                                    <p className='feedback-detail'>{feedback.detail}</p>
                                    <p className='feedback-category'>{feedback.category}</p>
                                </div>
                            </div>
                            <div className="feedback-comments">
                                <img src="assets/shared/icon-comments.svg" alt="comments ico" />
                                <p className='comments-num'>{feedback.numberOfComments}</p>
                            </div>
                        </div>
                    </Link>
                    </motion.div>
            )) : <NoFeedbacks />}
        </div>
    )
}

export default Feedbacks;