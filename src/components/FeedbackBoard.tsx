import "../styles/feedbackBoard.css";
import "../styles/dropdown.css";
import { sortType, FeedbackBoardProps } from "../types";
import { Link } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import FeedbacksList from "./FeedbacksList";
import { useState, useEffect } from "react";

function FeedbackBoard({ filters }: FeedbackBoardProps): JSX.Element {
  const [numberOfFeedbacks, setNumberOfFeedbacks] = useState<number>(0);
  const [sort, setSort] = useState<sortType>("most-upvotes");
  const [openedDropdown, setOpenedDropdown] = useState<boolean>(false);

  useEffect(() => {
    const feedbacksCollection = collection(db, "feedback");
    const unsubscribe = onSnapshot(feedbacksCollection, (snapshot) => {
      setNumberOfFeedbacks(snapshot.docs.length);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="feedback-board">
      <header className="board-header">
        <p className="header-number">{`${numberOfFeedbacks} ${
          numberOfFeedbacks == 1 ? "suggestion" : "suggestions"
        }`}</p>
        <div className="sort-dropdown">
          <button
            onClick={() => setOpenedDropdown(!openedDropdown)}
            className={`dropdown-btn-board ${openedDropdown ? "opened" : ""}`}
            role="button"
            id="select"
            value="Select"
            type="button"
            aria-label="Sort by options"
            aria-controls="sort"
            aria-haspopup="listbox"
            aria-expanded="false"
          >
            Sort by:{" "}
            <span className="bold capitalize">{sort.split("-").join(" ")}</span>
          </button>
          <ul
            className={`dropdown-menu dropdown-board ${
              openedDropdown ? "opened" : ""
            }`}
            aria-label="Sort options"
            role="listbox"
            id="sort"
            onClick={() => setOpenedDropdown(!openedDropdown)}
          >
            <li
              className={`menu-option ${
                sort == "most-upvotes" && "option-tagged"
              }`}
              role="option"
              onClick={() => setSort("most-upvotes")}
            >
              Most Upvotes
            </li>
            <li
              className={`menu-option ${
                sort == "least-upvotes" && "option-tagged"
              }`}
              role="option"
              onClick={() => setSort("least-upvotes")}
            >
              Least Upvotes
            </li>
            <li
              className={`menu-option ${
                sort == "most-comments" && "option-tagged"
              }`}
              role="option"
              onClick={() => setSort("most-comments")}
            >
              Most Comments
            </li>
            <li
              className={`menu-option ${
                sort == "least-comments" && "option-tagged"
              }`}
              role="option"
              onClick={() => setSort("least-comments")}
            >
              Least Comments
            </li>
          </ul>
        </div>
        <Link className="btn btn-primary" to="/addfeedback">
          + Add Feedback
        </Link>
      </header>
      <FeedbacksList
        setNumberOfFeedbacks={setNumberOfFeedbacks}
        filters={filters}
        sort={sort}
      />
    </div>
  );
}

export default FeedbackBoard;
