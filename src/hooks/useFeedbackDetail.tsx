import { Feedback } from "../types";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";

const useFeedbackDetail = (id: string) => {
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  useEffect(() => {
    const feedbackRef = doc(db, "feedback", id);

    const unsubscribe = onSnapshot(
      feedbackRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setFeedback({
            id: docSnapshot.id,
            title: data.title,
            category: data.category,
            detail: data.detail,
            status: data.status,
            numberOfComments: data.numberOfComments,
            upvotes: data.upvotes,
          });
        } else {
          console.error("No such document");
          setFeedback(null);
        }
      },
      (err) => {
        console.error("Error fetching feedback: ", err);
        setFeedback(null);
      }
    );

    return () => unsubscribe();
  }, [id]);

  return feedback;
};

export default useFeedbackDetail;
