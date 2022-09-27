import React, { useEffect } from 'react';
import { useState } from 'react';

function EditFAQ({ item, addFAQ }) {            //we get item (is an object containing the data that we want to edit) and editFAQ as props
    const [questionInput, setquestionInput] = useState('');
    const [answerInput, setAnswerInput] = useState('');

    useEffect(() => {
    setquestionInput(item.question);            // EditFAQ is simply similar to the AddFAQ except 
    setAnswerInput(item.answer)                 //using this useEffect 
    }, [item])                                  //whenever ([item]) is changing the useEffect fire.

    const handleQ = (e) => {
        setquestionInput(e.target.value);
    }
    const handleA = (e) => {
        setAnswerInput(e.target.value);
    }
    const handelSubmit = (e) => {
        e.preventDefault();
        if (questionInput !== '' && answerInput !== '' && answerInput !== ' ' && questionInput !== ' ') {
            addFAQ(questionInput, answerInput);
            setquestionInput('');
            setAnswerInput('');
        } else {
            alert("plz enter some text...")
        }


    }
    return (
        <div className='addfaq'>
            <h4 className=''>Edit Question Section</h4>
            <div className='addfaqContaner'>
                <form onSubmit={handelSubmit} >
                    <div>
                        <label>Question</label>
                        <input type='text' value={questionInput} onChange={handleQ} />
                    </div>
                    <div>
                        <label>Answer</label>
                        <textarea style={{width:'100%',resize: 'none', padding: '6px'}} rows="4" value={answerInput} onChange={handleA} />
                    </div>
                    <button type='submit' className='remove-btn' >Apply</button>
                </form>

            </div>

        </div>
    )
}

export default EditFAQ