import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import '../styles/addFeedbackForm.css';
import GoBack from './utils/GoBack';

function AddFeedbackForm(): JSX.Element {

    type categoryType = 'bug' | 'feature' | 'enhancement' | 'ux' | 'ui';

    const [title, setTitle] = useState<string>('');
    const [category, setCategory] = useState<categoryType>('bug');
    const [detail, setDetail] = useState<string>('');

    const [emptyTitle, setEmptyTitle] = useState<boolean>(false);
    const [emptyDetail, setEmptyDetail] = useState<boolean>(false);

    const addFeedback = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !category || !detail) {
            if (!title) setEmptyTitle(true);
            if (!detail) setEmptyDetail(true);
            return;
        } 
        try {
            await addDoc(collection(db, 'feedback'), {
                title: title,
                category: category,
                detail: detail,
                status: 'planned',
            });
        setTitle('');
        setCategory('bug');
        setDetail('');
        (e.target as HTMLFormElement).reset();
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    }

    const goBack = () => {
        window.history.back();
    }

    return (
        <main className='addfeedback-main'>   
            <form className='form' onSubmit={addFeedback}>
                <GoBack />
                <h2 className='form-title'>Create New Feedback</h2>
                <label className='label' htmlFor="title">Feedback Title</label>
                <p className='label-description'>Add a short, descriptive headline</p>
                <input 
                    className={`input text ${emptyTitle ? "empty-input" : ""}`} 
                    onChange={(e) => {
                        setTitle(e.target.value);
                        setEmptyTitle(false);
                    }} 
                    type="text" 
                    id="title" 
                    />
                <p className='error-message'>{emptyTitle ? "Can´t be empty" : ""}</p>
                <label className='label' htmlFor="category">Category</label>
                <p className='label-description'>Choose a category for your feedback</p>
                <select 
                  className='input select'
                  onChange={(e) => setCategory(e.target.value as categoryType)}
                  id="category">
                    <option value="bug">Bug</option>
                    <option value="feature">Feature</option>
                    <option value="enhancement">Enhancement</option>
                    <option value="ux">UX</option>
                    <option value="ui">UI</option>
                </select>
                <label className='label' htmlFor="detail">Feedback Detail</label>
                <p className='label-description'>Give more context on your feedback</p>
                <textarea 
                    className={`input ${emptyDetail ? "empty-input" : ""}`} 
                    onChange={(e) => {
                        setDetail(e.target.value);
                        setEmptyDetail(false);
                    }} 
                    id="detail"> 
                </textarea>
                <p className='error-message'>{emptyDetail ? "Can´t be empty" : ""}</p>
                <div className='buttons-container'>
                    <button className='btn btn-secondary' type='button' onClick={goBack}>Cancel</button>
                    <button className='btn btn-primary' type='submit'>Add Feedback</button>
                </div>
            </form>
        </main>
    )
}

export default AddFeedbackForm;