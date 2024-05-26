import '../styles/feedbacks.css';
import { FeedbacksProps, Feedback, Sort } from '../types';
import { Link } from 'react-router-dom';
import NoFeedbacks from './NoFeedbacks';
import { useMemo, useEffect } from 'react';
import useUpvote from '../hooks/useUpvote';
import useFeedbacks from '../hooks/useFeedbacks';
import { motion } from 'framer-motion';

function Feedbacks({ setNumberOfFeedbacks, all, ui, ux, enhancement, bug, feature, sort }: FeedbacksProps): JSX.Element {

    const { feedbacks, error } = useFeedbacks();
    const handleUpvote = useUpvote();

    const filteredFeedbacks = useMemo(() => {
        return feedbacks.filter((feedback) => {
            if (all) return true;
            if (ui && feedback.category === 'ui') return true;
            if (ux && feedback.category === 'ux') return true;
            if (enhancement && feedback.category === 'enhancement') return true;
            if (bug && feedback.category === 'bug') return true;
            if (feature && feedback.category === 'feature') return true;
            return false;
        });
    }, [all, ui, ux, enhancement, bug, feature, feedbacks]);

    const sortedFeedbacks = useMemo(() => {
        return sortFeedbacks(filteredFeedbacks, sort);
    }, [feedbacks, sort, filteredFeedbacks]);

    function sortFeedbacks(feedbacks: Feedback[], sort: Sort): Feedback[] {
        let sortedFeedbacks: Feedback[] = [...feedbacks];
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

    useEffect(() => {
        setNumberOfFeedbacks(sortedFeedbacks.length);
    }, [sortedFeedbacks, setNumberOfFeedbacks]);

    return (

        <div className='feedbacks'>
            {feedbacks.length > 0 ? sortedFeedbacks.map((feedback) => (
                <motion.div
                    key={feedback.id}
                    initial={{opacity: 0}} 
                    animate={{opacity: 1, transition: {duration: 0.15}}}>
                    <Link to={`/${feedback.id}`} key={feedback.id} >
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
            )) : <NoFeedbacks error={error} />}
        </div>
    )
}

export default Feedbacks;