import "../styles/feedbackBoard.css";
import "../styles/roadmap.css";
import "../styles/feedbacks.css";
import GoBack from "./utils/GoBack";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useFeedbacks from "../hooks/useFeedbacks";
import useUpvote from "../hooks/useUpvote";

function Roadmap(): JSX.Element {

    //udělat Feedback jako komponentu a použít ji zde
    //seřadit je podle počtu upvotů

    const handleUpvote = useUpvote();

    const {feedbacks } = useFeedbacks();

    const planned = feedbacks.filter(feedback => feedback.status === 'planned');
    const inProgress = feedbacks.filter(feedback => feedback.status === 'in-progress');
    const live = feedbacks.filter(feedback => feedback.status === 'live');

    return (
        <motion.div
            initial={{opacity: 0}} 
            animate={{opacity: 1, transition: {duration: 0.15}}}>
        <main className='roadmap'>
            <header className='roadmap-header'>
                <div className='header-container'>
                    <GoBack />
                    <h1>Roadmap</h1>
                </div>
                <Link className='btn btn-primary' to='/addfeedback'>+ Add Feedback</Link>
            </header>
            <section className='roadmap-content'>
                <div className="content-container">
                    <div className='content-header'>
                        <h2 className="header-h2">Planned ({planned.length})</h2>
                        <p className="header-descp">Ideas prioritized for research</p>
                    </div>
                    {planned.map(feedback => (
                    <Link to={`/${feedback.id}`} key={feedback.id} >
                        <div key={feedback.id} className='roadmap-feedback planned'>
                                <p className="feedback-state"><span className='circle orange'></span>Planned</p>
                                <p className='feedback-title'>{feedback.title}</p>
                                <p className='feedback-detail'>{feedback.detail}</p>
                                <p className='feedback-category'>{feedback.category}</p>
                            <div className='flex-between roadmap-upvotes-comments'>
                                <button className="btn btn-upvote" onClick={(e) => handleUpvote(feedback, e)}>{feedback.upvotes}</button> 
                                <div className="feedback-comments">
                                    <img src="assets/shared/icon-comments.svg" alt="comments ico" />
                                    <p className='comments-num'>{feedback.numberOfComments}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    ))}
                </div>
                <div className="content-container">
                    <div className='content-header'>
                        <h2 className="header-h2">In-Progress ({inProgress.length})</h2>
                        <p className="header-descp">Currently being developed</p>
                    </div>
                    {inProgress.map(feedback => (
                    <Link to={`/${feedback.id}`} key={feedback.id} >
                        <div key={feedback.id} className='roadmap-feedback in-progress'>
                                <p className="feedback-state"><span className='circle violet'></span>In-Progress</p>
                                <p className='feedback-title'>{feedback.title}</p>
                                <p className='feedback-detail'>{feedback.detail}</p>
                                <p className='feedback-category'>{feedback.category}</p>
                            <div className='flex-between roadmap-upvotes-comments'>
                                <button className="btn btn-upvote" onClick={(e) => handleUpvote(feedback, e)}>{feedback.upvotes}</button> 
                                <div className="feedback-comments">
                                    <img src="assets/shared/icon-comments.svg" alt="comments ico" />
                                    <p className='comments-num'>{feedback.numberOfComments}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    ))}
                </div>
                <div className="content-container">
                    <div className='content-header'>
                        <h2 className="header-h2">Live ({live.length})</h2>
                        <p className="header-descp">Released features</p>
                    </div>
                    {live.map(feedback => (
                    <Link to={`/${feedback.id}`} key={feedback.id} >
                        <div key={feedback.id} className='roadmap-feedback live'>
                                <p className="feedback-state"><span className='circle blue'></span>Planned</p>
                                <p className='feedback-title'>{feedback.title}</p>
                                <p className='feedback-detail'>{feedback.detail}</p>
                                <p className='feedback-category'>{feedback.category}</p>
                            <div className='flex-between roadmap-upvotes-comments'>
                                <button className="btn btn-upvote" onClick={(e) => handleUpvote(feedback, e)}>{feedback.upvotes}</button> 
                                <div className="feedback-comments">
                                    <img src="assets/shared/icon-comments.svg" alt="comments ico" />
                                    <p className='comments-num'>{feedback.numberOfComments}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    ))}
                </div>
            </section>
        </main>
        </motion.div>
    )
}

export default Roadmap;