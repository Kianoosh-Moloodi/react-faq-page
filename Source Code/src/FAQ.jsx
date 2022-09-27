import React from 'react'

function FAQ({ faq, index, toggleFAQ , removeFAQ ,editFAQ}) {                   //showing the whole FAQs
    return (
        <div className={"faq " + (faq.open ? ' open' : '')} key={index} >
            <div className='faq-question'  onClick={() => toggleFAQ(index)} >
                {faq.question}
            </div>
            <div className='faq-answer' >
                <p>
                    {faq.answer}
                </p>
                <button 
                className='remove-btn'
                onClick={()=>{removeFAQ(faq.id)}}
                >Remove</button>
                <button 
                className='remove-btn'
                onClick={()=>{editFAQ(faq.id)}}
                >Edit</button>

            </div>
        </div>
    )
}

export default FAQ