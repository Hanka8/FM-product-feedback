import { Feedback } from "../types";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { MouseEvent } from "react";

export default async function handleUpvote(
  feedback: Feedback,
  e: MouseEvent<HTMLButtonElement>
) {
  e.preventDefault();
  const localStorageKey = `${feedback.id}`;
  if (localStorage.getItem(localStorageKey)) {
    try {
      await updateDoc(doc(db, "feedback", feedback.id), {
        upvotes: feedback.upvotes - 1,
      });
      localStorage.removeItem(localStorageKey);
    } catch (err) {
      console.error("Failed to update upvote:", err);
    }
    return;
  }
  try {
    await updateDoc(doc(db, "feedback", feedback.id), {
      upvotes: feedback.upvotes + 1,
    });
    localStorage.setItem(localStorageKey, "true");
  } catch (err) {
    console.error("Failed to update upvote:", err);
  }
}
