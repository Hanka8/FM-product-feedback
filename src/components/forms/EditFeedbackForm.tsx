import "./feedbackForm.css";
import { db } from "../../../firebase.config";
import {
  doc,
  deleteDoc,
  updateDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useState, useEffect, useReducer } from "react";
import Dropdown from "../Dropdown/Dropdown";
import { Link } from "react-router-dom";
import { useFeedbackContext } from "../../context/FeedbackContext";
import { ActionEditFeedbackForm as Action, StateEditFeedbackForm as State} from "../../types";

function EditFeedback(): JSX.Element {
  const { id = "" } = useParams<{ id: string }>();
  const { feedbacks } = useFeedbackContext();
  const feedback = feedbacks.find((feedback) => feedback.id === id);
  const [deleted, setDeleted] = useState<boolean>(false);

  const initialState = {
    title: "",
    detail: "",
    category: "bug",
    status: "planned",
    emptyTitleOnSubmit: false,
    emptyDetailOnSubmit: false,
    feedbackAdded: false,
  };

  function formReducer(state: State, action: Action): State {
    switch (action.type) {
      case "SET_TITLE":
        return { ...state, title: action.payload };
      case "SET_DETAIL":
        return { ...state, detail: action.payload };
      case "SET_CATEGORY":
        return { ...state, category: action.payload };
      case "SET_STATUS":
        return { ...state, status: action.payload };
      case "SET_EMPTY_TITLE":
        return { ...state, emptyTitleOnSubmit: action.payload };
      case "SET_EMPTY_DETAIL":
        return { ...state, emptyDetailOnSubmit: action.payload };
      case "SET_FEEDBACK_ADDED":
        return { ...state, feedbackAdded: action.payload };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(formReducer, initialState);

  const [initialLoad, setInitialLoad] = useState<boolean>(true);

  useEffect(() => {
    if (feedback && initialLoad) {
      dispatch({ type: "SET_TITLE", payload: feedback.title });
      dispatch({ type: "SET_DETAIL", payload: feedback.detail });
      dispatch({ type: "SET_CATEGORY", payload: feedback.category });
      dispatch({ type: "SET_STATUS", payload: feedback.status });
      setInitialLoad(false);
    }
  }, [initialLoad, feedback]);

  const deleteFeedback = async () => {
    try {
      const commentsQuery = query(
        collection(db, "comments"),
        where("feedbackId", "==", id)
      );
      const commentsSnapshot = await getDocs(commentsQuery);
      const deleteCommentsPromises = commentsSnapshot.docs.map((commentDoc) =>
        deleteDoc(commentDoc.ref)
      );
      await Promise.all(deleteCommentsPromises);
      await deleteDoc(doc(db, "feedback", id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
    setDeleted(true);
  };

  const updateFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    const { title, detail, category, status } = state;
    if (!title || !detail) {
      if (!title) dispatch({ type: "SET_EMPTY_TITLE", payload: true });
      if (!detail) dispatch({ type: "SET_EMPTY_DETAIL", payload: true });
      return;
    }
    try {
      const feedbackRef = doc(db, "feedback", id);
      await updateDoc(feedbackRef, {
        title: title.trim().slice(0, 1).toUpperCase() + title.slice(1),
        detail: detail.trim(),
        category: category,
        status: status,
      });
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Error updating document: ", error);
      return;
    }
    dispatch({ type: "SET_FEEDBACK_ADDED", payload: true });
  };

  const revertChanges = () => {
    if (!feedback) return;
    dispatch({ type: "SET_TITLE", payload: feedback.title });
    dispatch({ type: "SET_DETAIL", payload: feedback.detail });
    dispatch({ type: "SET_CATEGORY", payload: feedback.category });
    dispatch({ type: "SET_STATUS", payload: feedback.status });
    dispatch({ type: "SET_EMPTY_TITLE", payload: false });
    dispatch({ type: "SET_EMPTY_DETAIL", payload: false });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.15 } }}
    >
      <main className="addfeedback-main">
        <form className="form form-edit" onSubmit={updateFeedback}>
          <Link to={`/${!deleted ? id : ""}`}>
            <button className="go-back" type="button">
              Go Back
            </button>
          </Link>
          {state.feedbackAdded? (
            <>
              <h2 className="form-title">Editing '{feedback?.title}'</h2>
              <div className="added-message text">
                Feedback edited successfully
              </div>
            </>
          ) : deleted ? (
            <>
              <h2 className="form-title">Deleting</h2>
              <div className="deleted-message text">
                Feedback deleted successfully
              </div>
            </>
          ) : (
            <>
              <label className="label" htmlFor="title">
                Feedback Title
              </label>
              <p className="label-description">
                Add a short, descriptive headline
              </p>
              <input
                className={`input text ${state.emptyTitleOnSubmit ? "empty-input" : ""}`}
                type="text"
                id="title"
                value={state.title}
                onChange={(e) => dispatch({ type: "SET_TITLE", payload: e.target.value })}
              />
              <p className="error-message">
                {state.emptyTitleOnSubmit ? "Can´t be empty" : ""}
              </p>
              <label className="label" htmlFor="category">
                Category
              </label>
              <p className="label-description">
                Change a category for your feedback
              </p>
              <Dropdown
                option={state.category}
                setOption={(value: string) => dispatch({ type: "SET_CATEGORY", payload: value })}
                dropdownType="category"
              />
              <label className="label" htmlFor="updateStatus">
                Update status
              </label>
              <p className="label-description">
                Change {feedback?.category} state
              </p>
              <Dropdown
                option={state.status}
                setOption={(value: string) => dispatch({ type: "SET_STATUS", payload: value })}
                dropdownType="status"
              />
              <label className="label" htmlFor="detail">
                Feedback Detail
              </label>
              <p className="label-description">
                Give more context on your feedback
              </p>
              <textarea
                value={state.detail}
                className={`input ${state.emptyDetailOnSubmit ? "empty-input" : ""}`}
                id="detail"
                onChange={(e) => dispatch({ type: "SET_DETAIL", payload: e.target.value })}
              ></textarea>
              <p className="error-message">
                {state.emptyDetailOnSubmit ? "Can´t be empty" : ""}
              </p>
              <p className="error-message"></p>
              <div className="buttons-container edit">
                <button
                  className="btn btn-tertiary delete"
                  type="button"
                  onClick={deleteFeedback}
                >
                  Delete
                </button>
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={revertChanges}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" type="submit">
                  Save changes
                </button>
              </div>
            </>
          )}
        </form>
      </main>
    </motion.div>
  );
}

export default EditFeedback;