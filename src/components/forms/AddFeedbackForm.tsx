import "../../styles/feedbackForm.css";
import "../../styles/dropdown.css";
import { categoryType } from "../../types";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import GoBack from "../UI/GoBack";
import { motion } from "framer-motion";
import { useState } from "react";

import Dropdown from "../UI/Dropdown";

function AddFeedbackForm(): JSX.Element {
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<categoryType>("bug");
  const [detail, setDetail] = useState<string>("");

  const [emptyTitle, setEmptyTitle] = useState<boolean>(false);
  const [emptyDetail, setEmptyDetail] = useState<boolean>(false);

  const [feedbackAdded, setFeedbackAdded] = useState<boolean>(false);

  const addFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !detail) {
      if (!title) setEmptyTitle(true);
      if (!detail) setEmptyDetail(true);
      return;
    }
    try {
      await addDoc(collection(db, "feedback"), {
        title: title.slice(0, 1).toUpperCase() + title.slice(1),
        category: category,
        detail: detail,
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

  const goBack = () => {
    window.history.back();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.15 } }}
    >
      <main className="addfeedback-main">
        <form className="form form-add" onSubmit={addFeedback}>
          <GoBack />
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
                  onClick={goBack}
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