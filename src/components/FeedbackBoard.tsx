import '../styles/feedbackBoard.css';
import '../styles/dropdown.css';
import { sortType, FeedbackBoardProps } from '../types';
import { Link } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import Feedbacks from './FeedbacksList';
import { useState, useEffect } from 'react';

function FeedbackBoard({all, ui, ux, enhancement, bug, feature} : FeedbackBoardProps): JSX.Element {

    const [numberOfFeedbacks, setNumberOfFeedbacks] = useState<number>(0);
    const [sort, setSort] = useState<sortType>('most-upvotes');
    const [openedDropdown, setOpenedDropdown] = useState<boolean>(false);

    useEffect(() => {
        const feedbacksCollection = collection(db, 'feedback');
        const unsubscribe = onSnapshot(feedbacksCollection, (snapshot) => {
            setNumberOfFeedbacks(snapshot.docs.length);
        });

        return () => {
            unsubscribe();
        }
    }, []);

    function capitalize(string: string) {
        return string.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    }

    return (
        <div className='feedback-board'>
            <header className='board-header'>
                <p className='header-number'>{`${numberOfFeedbacks} suggestions`}</p>
                <div className='sort-dropdown'>
                    <button
                        onClick={() => setOpenedDropdown(!openedDropdown)}
                        className={`dropdown-btn-board ${openedDropdown ? "opened" : ""}`}
                        role="combobox"
                        id="select"
                        value="Select"
                        type='button'
                        aria-controls="listbox"
                        aria-haspopup="listbox"
                        aria-expanded="false">
                        Sort by: <span className='bold'>{capitalize(sort.split("-").join(" "))}</span>
                    </button>
                    <ul className={`dropdown-menu dropdown-board ${openedDropdown ? "opened" : ""} dropdown-board`} role="listbox" id="sort" onClick={() => setOpenedDropdown(!openedDropdown)}>
                        <li className={`menu-option ${sort == "most-upvotes" && "option-tagged"}`} role="option" onClick={() => setSort("most-upvotes")}>Most Upvotes</li>
                        <li className={`menu-option ${sort == "least-upvotes" && "option-tagged"}`} role="option" onClick={() => setSort("least-upvotes")}>Least Upvotes</li>
                        <li className={`menu-option ${sort == "most-comments" && "option-tagged"}`} role="option" onClick={() => setSort("most-comments")}>Most Comments</li>
                        <li className={`menu-option ${sort == "least-comments" && "option-tagged"}`} role="option" onClick={() => setSort("least-comments")}>Least Comments</li>
                    </ul>
                </div>
                <Link className='btn btn-primary' to='/addfeedback'>+ Add Feedback</Link>
            </header>
                <Feedbacks
                    setNumberOfFeedbacks={setNumberOfFeedbacks}
                    all={all}
                    ui={ui}
                    ux={ux}
                    enhancement={enhancement}
                    bug={bug}
                    feature={feature}
                    sort={sort}
                />
        </div>
    )
}

export default FeedbackBoard;