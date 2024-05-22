import { useState } from "react";
import "../styles/comment.css";
import { doc, collection, addDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import useComments from "../hooks/useComments";

interface CommentProps {
    id: string;
}

function AddComment( {id}: CommentProps ):JSX.Element {

    const MAX_CHARACTERS = 250;

    const currentNumberOfComments = useComments(id).comments.length;

    const [comment, setComment] = useState<string>('');
    const [emptyComment, setEmptyComment] = useState<boolean>(false);

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!comment) {
            setEmptyComment(true);
            return;
        }
        try {
            await addDoc(collection(db, "comments"), {
                feedbackId: id,
                comment: comment,
            });
            await updateDoc(doc(db, 'feedback', id), {
                numberOfComments: currentNumberOfComments + 1,
            });
        }
        catch (error) {
            console.error('Error adding document: ', error);
            return;
        }
        setComment('');
        setEmptyComment(false);
        (e.target as HTMLFormElement).reset();
    }

    return (
        <form className="add-comment" onSubmit={handleSubmit}>
            <label className="comment-heading" htmlFor="comment">Add Comment</label>
            <textarea 
                className={`${emptyComment ? "empty-input" : ""} input`} 
                id="comment" 
                placeholder="Type your comment here" 
                rows={3} 
                onChange={(e) => setComment(e.target.value)}
                maxLength={MAX_CHARACTERS}
                >
            </textarea>
            <p className='error-message'>{emptyComment ? "Can´t be empty" : ""}</p>
            <div className="form-row">
                <p>{MAX_CHARACTERS - comment.length} Characters left</p>
                <button type="submit" className="btn btn-primary">Post Comment</button>
            </div>
        </form>
    )
}

export default AddComment;