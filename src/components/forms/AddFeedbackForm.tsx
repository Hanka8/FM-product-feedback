import "./feedbackForm.css";
import {
  categoryType,
  StateAddFeedbackForm as State,
  ActionAddFeedbackForm as Action,
} from "../../types";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase.config";
import { motion } from "framer-motion";
import { useReducer } from "react";
import Dropdown from "../Dropdown/Dropdown";
import FeedbackAdded from "./FeedbackAdded";
import { Link } from "react-router-dom";

function AddFeedbackForm(): JSX.Element {
  const initialState: State = {
    title: "",
    category: "bug",
    detail: "",
    emptyTitleOnSubmit: false,
    emptyDetailOnSubmit: false,
    feedbackAdded: false,
  };

  const formReducer = (state: State, action: Action): State => {
    switch (action.type) {
      case "SET_TITLE":
        return { ...state, title: action.payload };
      case "SET_CATEGORY":
        return { ...state, category: action.payload };
      case "SET_DETAIL":
        return { ...state, detail: action.payload };
      case "SET_EMPTY_TITLE_ON_SUBMIT":
        return { ...state, emptyTitleOnSubmit: action.payload };
      case "SET_EMPTY_DETAIL_ON_SUBMIT":
        return { ...state, emptyDetailOnSubmit: action.payload };
      case "SET_FEEDBACK_ADDED":
        return { ...state, feedbackAdded: action.payload };
      case "RESET_FORM":
        return {
          ...initialState,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(formReducer, initialState);

  const addFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.title || !state.detail) {
      if (!state.title)
        dispatch({ type: "SET_EMPTY_TITLE_ON_SUBMIT", payload: true });
      if (!state.detail)
        dispatch({ type: "SET_EMPTY_DETAIL_ON_SUBMIT", payload: true });
      return;
    }
    try {
      await addDoc(collection(db, "feedback"), {
        title:
          state.title.trim().slice(0, 1).toUpperCase() + state.title.slice(1),
        category: state.category,
        detail: state.detail.trim(),
        status: "planned",
        numberOfComments: 0,
        upvotes: 0,
      });
      dispatch({ type: "RESET_FORM" });
    } catch (error) {
      console.error("Error adding document: ", error);
      return;
    }
    dispatch({ type: "SET_FEEDBACK_ADDED", payload: true });
  };

  const resetForm = () => {
    dispatch({ type: "RESET_FORM" });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.15 } }}
    >
      <main className="addfeedback-main">
        <form className="form form-add" onSubmit={addFeedback}>
          <Link to="/">
            <button className="go-back" type="button">
              Go Back
            </button>
          </Link>
          <h2 className="form-title">Create New Feedback</h2>
          {state.feedbackAdded ? (
            <FeedbackAdded
              setFeedbackAdded={(value: boolean) =>
                dispatch({ type: "SET_FEEDBACK_ADDED", payload: value })
              }
            />
          ) : (
            <>
              <label className="label" htmlFor="title">
                Feedback Title
              </label>
              <p className="label-description">
                Add a short, descriptive headline
              </p>
              <input
                value={state.title}
                className={`input text ${
                  state.emptyTitleOnSubmit ? "empty-input" : ""
                }`}
                onChange={(e) => {
                  dispatch({ type: "SET_TITLE", payload: e.target.value });
                  dispatch({
                    type: "SET_EMPTY_TITLE_ON_SUBMIT",
                    payload: false,
                  });
                }}
                type="text"
                id="title"
              />
              <p className="error-message">
                {state.emptyTitleOnSubmit ? "Can´t be empty" : ""}
              </p>
              <label className="label" htmlFor="category">
                Category
              </label>
              <p className="label-description">
                Choose a category for your feedback
              </p>
              <Dropdown
                dropdownType="category"
                option={state.category}
                setOption={(value: categoryType) =>
                  dispatch({ type: "SET_CATEGORY", payload: value })
                }
              />
              <label className="label" htmlFor="detail">
                Feedback Detail
              </label>
              <p className="label-description">
                Give more context on your feedback
              </p>
              <textarea
                value={state.detail}
                className={`input ${
                  state.emptyDetailOnSubmit ? "empty-input" : ""
                }`}
                onChange={(e) => {
                  dispatch({ type: "SET_DETAIL", payload: e.target.value });
                  dispatch({
                    type: "SET_EMPTY_DETAIL_ON_SUBMIT",
                    payload: false,
                  });
                }}
                id="detail"
              ></textarea>
              <p className="error-message">
                {state.emptyDetailOnSubmit ? "Can´t be empty" : ""}
              </p>
              <div className="buttons-container">
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={resetForm}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" type="submit">
                  Add Feedback
                </button>
              </div>
            </>
          )}
        </form>
      </main>
    </motion.div>
  );
}

export default AddFeedbackForm;
