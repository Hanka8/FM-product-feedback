import { Comment } from "../types";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useState, useEffect } from "react";

const useComments = (feedbackId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [errorComments, setErrorComments] = useState<string | null>(null);
  const [loadingComments, setLoadingComments] = useState<boolean>(true);

  useEffect(() => {
    const commentsCollection = collection(db, "comments");
    const q = query(commentsCollection, where("feedbackId", "==", feedbackId));
    setLoadingComments(true);
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setComments(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Comment))
        );
        setLoadingComments(false);
      },
      () => {
        setErrorComments("Error fetching comments");
      }
    );

    return () => unsubscribe();
  }, [feedbackId]);

  return { comments, errorComments, loadingComments };
};

export default useComments;
