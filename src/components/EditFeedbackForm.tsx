import "../styles/feedbackForm.css";
import GoBack from "./utils/GoBack";
import { useParams } from "react-router-dom";
import useFeedbackDetail from "../hooks/useFeedbackDetail";
import { db } from "../firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

function EditFeedback(): JSX.Element {

    const { id = "" } = useParams<{ id: string }>();
    const { feedback } = useFeedbackDetail(id!);
    const [deleted, setDeleted] = useState<boolean>(false);

    const [title, setTitle] = useState<string>('');
    const [detail, setDetail] = useState<string>('');
    const [category, setCategory] = useState<string>('bug');
    const [status, setStatus] = useState<string>('planned');

    const [emptyTitle, setEmptyTitle] = useState<boolean>(false);
    const [emptyDetail, setEmptyDetail] = useState<boolean>(false);

    const [feedbackAdded, setFeedbackAdded] = useState<boolean>(false);

    useEffect(() => {
        if (feedback) {
            setTitle(feedback.title);
            setDetail(feedback.detail);
            setCategory(feedback.category);
            setStatus(feedback.status || 'planned');
        }
    }, [feedback]);

    const goBack = () => {
        window.history.back();
    }

    const deleteFeedback = async () => {
        try {
            await deleteDoc(doc(db, 'feedback', id));
        } catch (error) {
            console.error('Error deleting document: ', error);
        }
        setDeleted(true);
    }

    const updateFeedback = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !detail) {
            if (!title) setEmptyTitle(true);
            if (!detail) setEmptyDetail(true);
            return;
        }
        try {
            const feedbackRef = doc(db, 'feedback', id);
            await updateDoc(feedbackRef, {
                title: title,
                detail: detail,
                category: category,
                status: status,
            });
            // setTitle('');
            // setDetail('');
            // setCategory('bug');
            // setStatus('planned');
            (e.target as HTMLFormElement).reset();
        }
        catch (error) {
            console.error('Error updating document: ', error);
            return;
        }
        setFeedbackAdded(true);
    }

    console.log(title)

    return (
         <main className='addfeedback-main'>   
            <form className='form form-edit' onSubmit={updateFeedback} >
                <GoBack deleted={deleted} />
                <h2 className='form-title'>Editing '{feedback?.title}'</h2>
                {feedbackAdded ? 
                    <div className='added-message text'>Feedback edited successfully</div>
                :
                deleted ? <div className='deleted-message text'>Feedback deleted successfully</div> :
                <>
                <label className='label' htmlFor="title">Feedback Title</label>
                <p className='label-description'>Add a short, descriptive headline</p>
                <input 
                    className={`input text ${emptyTitle ? "empty-input" : ""}`}
                    type="text" 
                    id="title"
                    defaultValue={feedback?.title}
                    onChange={(e) => setTitle(e.target.value as string)}
                    />
                <p className='error-message'>{emptyTitle ? "Can´t be empty" : ""}</p>
                <label className='label' htmlFor="category">Category</label>
                <p className='label-description'>Change a category for your feedback</p>
                <select
                  className='input select'
                  id="category"
                  defaultValue={feedback?.category || 'bug'}
                  onChange={(e) => setCategory(e.target.value as string)}
                  >
                    <option value="bug">Bug</option>
                    <option value="feature">Feature</option>
                    <option value="enhancement">Enhancement</option>
                    <option value="ux">UX</option>
                    <option value="ui">UI</option>
                </select>
                <label className="label" htmlFor="updateStatus">Update status</label>
                <p className='label-description'>Change {feedback?.category} state</p>
                <select 
                  className='input select'
                  id="updateStatus"
                  defaultValue={feedback?.status || 'suggestion'}
                  onChange={(e) => setStatus(e.target.value as string)}
                  >
                    <option value="suggestion">Suggestion</option>
                    <option value="planned">Planned</option>
                    <option value="in-progress">In Progress</option>
                    <option value="live">Live</option>
                </select>
                <label className='label' htmlFor="detail">Feedback Detail</label>
                <p className='label-description'>Give more context on your feedback</p>
                <textarea
                    defaultValue={feedback?.detail}
                    className={`input ${emptyDetail ? "empty-input" : ""}`}
                    id="detail"
                    onChange={(e) => setDetail(e.target.value as string)}
                    > 
                </textarea>
                <p className='error-message'>{emptyDetail ? "Can´t be empty" : ""}</p>
                <p className='error-message'></p>
                <div className='buttons-container edit'>
                    <button className='btn btn-tertiary delete' type='button' onClick={deleteFeedback}>Delete</button>
                    <button className='btn btn-secondary' type='button' onClick={goBack}>Cancel</button>
                    <button className='btn btn-primary' type='submit'>Save changes</button>
                </div>
                </>}
            </form>
        </main>
    )
}

export default EditFeedback;