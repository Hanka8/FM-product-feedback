import "../../styles/feedbackForm.css";
import "../../styles/dropdown.css";
import { categoryType } from "../../types";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase.config";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import Dropdown from "../UI/Dropdown";
import { Link } from "react-router-dom";

function AddFeedbackForm(): JSX.Element {
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<categoryType>("bug");
  const [detail, setDetail] = useState<string>("");

  const [emptyTitle, setEmptyTitle] = useState<boolean>(false);
  const [emptyDetail, setEmptyDetail] = useState<boolean>(false);

  const [feedbackAdded, setFeedbackAdded] = useState<boolean>(false);

  const formRef = useRef<HTMLFormElement>(null);

  const addFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !detail) {
      if (!title) setEmptyTitle(true);
      if (!detail) setEmptyDetail(true);
      return;
    }
    try {
      await addDoc(collection(db, "feedback"), {
        title: title.trim().slice(0, 1).toUpperCase() + title.slice(1),
        category: category,
        detail: detail.trim(),
        status: "planned",
        numberOfComments: 0,
        upvotes: 0,
      });
      setTitle("");
      setCategory("bug");
      setDetail("");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Error adding document: ", error);
      return;
    }
    setFeedbackAdded(true);
  };

  const resetForm = () => {
    setTitle("");
    setCategory("bug");
    setDetail("");
    setEmptyTitle(false);
    setEmptyDetail(false);
    if (formRef.current) {
      formRef.current.reset();
    }
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
          {feedbackAdded ? (
            <>
              <div className="added-message text">
                Feedback added successfully
              </div>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => {
                  setFeedbackAdded(true);
                  window.location.reload();
                }}
              >
                Add Another
              </button>
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
                value={title}
                className={`input text ${emptyTitle ? "empty-input" : ""}`}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setEmptyTitle(false);
                }}
                type="text"
                id="title"
              />
              <p className="error-message">
                {emptyTitle ? "Can´t be empty" : ""}
              </p>
              <label className="label" htmlFor="category">
                Category
              </label>
              <p className="label-description">
                Choose a category for your feedback
              </p>
              <Dropdown
                dropdownType="category"
                option={category}
                setOption={setCategory}
              />
              <label className="label" htmlFor="detail">
                Feedback Detail
              </label>
              <p className="label-description">
                Give more context on your feedback
              </p>
              <textarea
                value={detail}
                className={`input ${emptyDetail ? "empty-input" : ""}`}
                onChange={(e) => {
                  setDetail(e.target.value);
                  setEmptyDetail(false);
                }}
                id="detail"
              ></textarea>
              <p className="error-message">
                {emptyDetail ? "Can´t be empty" : ""}
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
