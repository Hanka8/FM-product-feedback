import { Comment } from "../types";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useState, useEffect } from "react";

const useComments = (feedbackId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const commentsCollection = collection(db, "comments");
    const q = query(commentsCollection, where("feedbackId", "==", feedbackId));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setComments(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Comment))
        );
      },
      () => {
        setError("Error fetching comments");
      }
    );

    return () => unsubscribe();
  }, [feedbackId]);

  return { comments, error };
};

export default useComments;
