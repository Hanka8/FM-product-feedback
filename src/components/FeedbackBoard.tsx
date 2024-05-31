import "../styles/feedbackBoard.css";
import "../styles/dropdown.css";
import { sortType, FeedbackBoardProps } from "../types";
import { Link } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import FeedbacksList from "./FeedbacksList";
import { useState, useEffect } from "react";

function FeedbackBoard({ filter }: FeedbackBoardProps): JSX.Element {
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
          >
            Sort by:{" "}
            <span className="bold" style={{ textTransform: "capitalize" }}>
              {sort}
            </span>
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
        filter={filter}
        sort={sort}
      />
    </div>
  );
}

export default FeedbackBoard;
