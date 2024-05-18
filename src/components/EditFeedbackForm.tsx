import "../styles/feedbackForm.css";
import GoBack from "./utils/GoBack";
import { useParams } from "react-router-dom";
import useFeedbackDetail from "../hooks/useFeedbackDetail";
import { db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { useState } from "react";

function EditFeedback(): JSX.Element {

    const { id = "" } = useParams<{ id: string }>();
    const { feedback } = useFeedbackDetail(id!);
    const [deleted, setDeleted] = useState<boolean>(false);

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

    return (
         <main className='addfeedback-main'>   
            <form className='form form-edit' >
                <GoBack deleted={deleted} />
                <h2 className='form-title'>Editing '{feedback?.title}'</h2>
                {deleted ? <div className='deleted-message text'>Feedback deleted successfully</div> :
                <>
                <label className='label' htmlFor="title">Feedback Title</label>
                <p className='label-description'>Add a short, descriptive headline</p>
                <input 
                    className="input text"
                    type="text" 
                    id="title"
                    defaultValue={feedback?.title} 
                    />
                <p className='error-message'></p>
                <label className='label' htmlFor="category">Category</label>
                <p className='label-description'>Change a category for your feedback</p>
                <select
                  className='input select'
                  id="category"
                  defaultValue={feedback?.category}>
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
                  defaultValue={feedback?.status}>
                    <option value="suggestion">Suggestion</option>
                    <option value="planned">Planned</option>
                    <option value="in-progress">In Progress</option>
                    <option value="live">Live</option>
                </select>
                <label className='label' htmlFor="detail">Feedback Detail</label>
                <p className='label-description'>Give more context on your feedback</p>
                <textarea
                    defaultValue={feedback?.detail}
                    className="input"
                    id="detail"> 
                </textarea>
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