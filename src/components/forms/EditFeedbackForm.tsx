import "../../styles/feedbackForm.css";
import "../../styles/dropdown.css";
import { db } from "../../firebase";
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
import useFeedbackDetail from "../../hooks/useFeedbackDetail";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Dropdown from "../UI/Dropdown";
import { Link} from "react-router-dom";

function EditFeedback(): JSX.Element {
  const { id = "" } = useParams<{ id: string }>();
  const { feedback } = useFeedbackDetail(id!);
  const [deleted, setDeleted] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const [category, setCategory] = useState<string>("bug");
  const [status, setStatus] = useState<string>("planned");

  const [emptyTitle, setEmptyTitle] = useState<boolean>(false);
  const [emptyDetail, setEmptyDetail] = useState<boolean>(false);

  const [feedbackAdded, setFeedbackAdded] = useState<boolean>(false);

  //e a flag to track whether the initial feedback has been loaded
  const [initialLoad, setInitialLoad] = useState<boolean>(true);

  useEffect(() => {
    if (feedback && initialLoad) {
      setTitle(feedback.title);
      setDetail(feedback.detail);
      setCategory(feedback.category);
      setStatus(feedback.status);
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
    if (!title || !detail) {
      if (!title) setEmptyTitle(true);
      if (!detail) setEmptyDetail(true);
      return;
    }
    try {
      const feedbackRef = doc(db, "feedback", id);
      await updateDoc(feedbackRef, {
        title: title.slice(0, 1).toUpperCase() + title.slice(1),
        detail: detail,
        category: category,
        status: status,
      });
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Error updating document: ", error);
      return;
    }
    setFeedbackAdded(true);
  };

  const revertChanges = () => {
    if (!feedback) return;
    setTitle(feedback.title);
    setDetail(feedback.detail);
    setCategory(feedback.category);
    setStatus(feedback.status);
    setEmptyTitle(false);
    setEmptyDetail(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.15 } }}
    >
      <main className="addfeedback-main">
        <form className="form form-edit" onSubmit={updateFeedback}>
          <Link to={`/${!deleted ? id : ""}`}>
            <button className="go-back">Go Back</button>
          </Link>
          <h2 className="form-title">Editing '{feedback?.title}'</h2>
          {feedbackAdded ? (
            <div className="added-message text">
              Feedback edited successfully
            </div>
          ) : deleted ? (
            <div className="deleted-message text">
              Feedback deleted successfully
            </div>
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
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value as string)}
              />
              <p className="error-message">
                {emptyTitle ? "Can´t be empty" : ""}
              </p>
              <label className="label" htmlFor="category">
                Category
              </label>
              <p className="label-description">
                Change a category for your feedback
              </p>
              <Dropdown
                option={category}
                setOption={setCategory}
                dropdownType="category"
              />
              <label className="label" htmlFor="updateStatus">
                Update status
              </label>
              <p className="label-description">
                Change {feedback?.category} state
              </p>
              <Dropdown
                option={status}
                setOption={setStatus}
                dropdownType="status"
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
                id="detail"
                onChange={(e) => setDetail(e.target.value as string)}
              ></textarea>
              <p className="error-message">
                {emptyDetail ? "Can´t be empty" : ""}
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
