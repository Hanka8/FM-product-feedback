import { useState } from 'react';
import { query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import '../styles/addFeedbackForm.css';

function AddFeedbackForm(): JSX.Element {

    type categoryType = 'bug' | 'feature' | 'enhancement';

    const [title, setTitle] = useState<string>('');
    const [category, setCategory] = useState<categoryType>('bug');
    const [detail, setDetail] = useState<string>('');

    const addFeedback = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !category || !detail) return;
        try {
            await addDoc(collection(db, 'feedback'), {
                title: title,
                category: category,
                detail: detail,
            });
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    }

    return (
        <form className='form' onSubmit={addFeedback}>
            <h2 className='form-title'>Create New Feedback</h2>
            <label className='label' htmlFor="title">Feedback Title</label>
            <p className='label-description'>Add a short, descriptive headline</p>
            <input className='input text' onChange={(e) => setTitle(e.target.value)} type="text" id="title" />
            <label className='label' htmlFor="category">Category</label>
            <p className='label-description'>Choose a category for your feedback</p>
            <select className='input select' onChange={(e) => setCategory(e.target.value as categoryType)} id="category">
                <option value="bug">Bug</option>
                <option value="feature">Feature</option>
                <option value="enhancement">Enhancement</option>
            </select>
            <label className='label' htmlFor="detail">Feedback Detail</label>
            <p className='label-description'>Give more context on your feedback</p>
            <textarea className='input' onChange={(e) => setDetail(e.target.value)} id="detail"></textarea>
            <div className='buttons-container'>
                <button className='btn cancel'>Cancel</button>
                <button className='btn submit' type='submit'>Add Feedback</button>
            </div>
        </form>
    )
}

export default AddFeedbackForm;