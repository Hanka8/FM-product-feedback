import "../styles/feedbackForm.css";
import GoBack from "./utils/GoBack";
import { useParams } from "react-router-dom";
import useFeedbackDetail from "../hooks/useFeedbackDetail";

function EditFeedback(): JSX.Element {

    const { id } = useParams<{ id: string }>();
    const { feedback } = useFeedbackDetail(id!);

    const goBack = () => {
        window.history.back();
    }

    return (
         <main className='addfeedback-main'>   
            <form className='form form-edit' >
                <GoBack />
                <h2 className='form-title'>Editing '{feedback?.title}'</h2>
                <label className='label' htmlFor="title">Feedback Title</label>
                <p className='label-description'>Add a short, descriptive headline</p>
                <input 
                    className="input text"
                    type="text" 
                    id="title" 
                    />
                <p className='error-message'></p>
                <label className='label' htmlFor="category">Category</label>
                <p className='label-description'>Change a category for your feedback</p>
                <select 
                  className='input select'
                  id="category">
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
                  id="updateStatus">
                    <option value="planned">Planned</option>
                    <option value="in-progress">In Progress</option>
                    <option value="live">Live</option>
                </select>
                <label className='label' htmlFor="detail">Feedback Detail</label>
                <p className='label-description'>Give more context on your feedback</p>
                <textarea 
                    className="input"
                    id="detail"> 
                </textarea>
                <p className='error-message'></p>
                <div className='buttons-container edit'>
                    <button className='btn btn-tertiary delete' type='button'>Delete</button>
                    <button className='btn btn-secondary' type='button' onClick={goBack}>Cancel</button>
                    <button className='btn btn-primary' type='submit'>Save changes</button>
                </div>
            </form>
        </main>
    )
}

export default EditFeedback;