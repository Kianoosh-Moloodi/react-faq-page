import React from 'react';
import { useState } from 'react';

function AddFAQ({ addFAQ }) {                                              //we get addFAQ as a props from APP.js 
    const [questionInput, setquestionInput] = useState('');
    const [answerInput, setAnswerInput] = useState('');
    const handleQ = (e) => {                                               //it returns the value of the input and it will assign to 'questionInput' by the 'setquestionInput' function                                   
        setquestionInput(e.target.value);
    }
    const handleA = (e) => {
        setAnswerInput(e.target.value);
    }
    const handelSubmit = (e) => {                                          // we check wethere the input of an q and a is empty or not
        e.preventDefault();                                                //if they are not empty we send the input data to the addFAQ function to assign the data, after that we make the inputs empty 
        if (questionInput !== '' && answerInput !== '' && answerInput !== ' '&& questionInput !== ' ') {
            addFAQ(questionInput, answerInput);
            setquestionInput('');
            setAnswerInput('');
        } else {
            alert("Please Enter Some Text")
        }


    }
    return (
        <div className='addfaq'>
            <h4 className=''>New Question Section</h4>
            <div className='addfaqContaner'>
                <form onSubmit={handelSubmit}>
                    <div>
                        <label>Question</label>
                        <input type='text' value={questionInput} onChange={handleQ} placeholder='What is on Your Mind?'/>
                    </div>
                    <div>
                        <label>Answer</label>
                        <textarea style={{width:'100%',resize: 'none', padding: '6px'}} rows="4" type='text' value={answerInput} onChange={handleA} />
                    </div>
                    <button type='submit' className='remove-btn' >Add to FAQs</button>
                </form>

            </div>

        </div>
    )
}

export default AddFAQ