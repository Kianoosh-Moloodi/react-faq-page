import React, { useEffect, useState } from 'react';
import faqsData from './data';
import Header from './Header';
import Footer from './Footer';
import FAQ from './FAQ';
import AddFAQ from './AddFAQ';
import EditFAQ from './EditFAQ';

const getLocalStorage = () => {                            // The localStorage object allows you to save key/value pairs in the browser and stores data with no expiration date.
  let faqs = localStorage.getItem('faqs');                 // The data is not deleted when the browser is closed, and are available for future sessions.
  if (faqs) {                                              //localStorage.getItem('faqs'); read data from local storage. now we have our data in 'faqs' and then returns the json data if there 
    return JSON.parse(localStorage.getItem("faqs"))        //is no data it uses faqsData which has a default data. 
  } else {
    return faqsData;
  }
}

function App() {
  const [faqs, setFaqs] = useState(getLocalStorage);        //the most modern way to handle state variables in an app is to use function called useState.
  const[item , setItem] = useState({});                     //with destructuring we set the usestate with the first element of an array with the data (which is got by the getlocalstorage function)
  const[num , setNum]=useState(10);                         //and changing the state with the second element (setFaqs) which is a function to change the state.

  const removeFAQ = (id) => {                               //removeFAQ is an arrow function to remove the data by using 'filter'.
    const newfaqs = faqs.filter((faq, i) => {               //filter method creates a new array filled with elements that pass a test provided by a function and it does not change the original array.
      if (id !== faq.id) {                                  //now 'newfaqs' contains data without that one that is removed.
        return faq;
      }
    });
    setFaqs(newfaqs);
  }

  const editFAQ = (index) => {                              //editFAQ is an arrow function to edit the data by using 'find. first of all we call removeFAQ function to return the id of the data that we want to edit.
    removeFAQ(index);                                       //then we use find method to find the index that we want. now myitem contain an object of the selected data.
    const myitem = faqs.find((faq, i) => {
      if (faq.id === index) {
        return faq;
      }
    });
    setItem(myitem)
  }

  const sortData = (data, Key) => {                         //sortData for sorting data based on guestions by using sort method. The default sort order is ascending.
    let sortedData;                                         //sort method take in a function, Specifies a function that defines the sort order. 
    if (Key === 'question') {
      sortedData = data.sort(function (a, b) {
        let x = a.question;
        let y = b.question;
        if (x > y) { return 1; }
        if (x < y) { return -1; }
        return 0;
      });
    }
    setFaqs([...sortedData]);
    return sortedData;
  }

  const sortDataDESC = (data, key) => {                     // sortDataDESC simply use the sorted data and reverse it to show the dedcending sort of data. as simple as that :)
    let temp = []
    temp = sortData(data, key);
    temp.reverse();
    setFaqs([...temp])
  }

 
  const toggleFAQ = index => {                              //toggleFAQ checks wethere the toggle is open or not
    setFaqs(faqs.map((faq, i) => {
      if (i === index) {
        faq.open = !faq.open
      }
      else {
        faq.open = false;
      }
      return faq;
    }))
  }

  const addFAQ = (q, a) => {                                //addFAQ adds new data to the current data and assign the q and a to the question and answer respectively. setFaqs is always change the state the data.
    let temp = {
      question: q,
      answer: a,
      open: false,
      id:num
    }
    setNum(num+1);
    setFaqs([...faqs, temp]);
  }

  useEffect(() => {                                         //useEffect typically used to manage side effects that are not related to components render. actullay take in two arguments.  
    localStorage.setItem('faqs', JSON.stringify(faqs))      //the first is the function that's going to be called, whenever we want our effect too happen. the second is has to do with when the effect 
  }, [faqs])                                                //is actually being called. we pass in a property ([faqs]) a state value to listen for any changes in this array.  
                                                            //anytime this value changes, we are going to see this useEffect fire.


  return (
    <>
      <Header />
      <div className='btn-container'>
        <h1>FAQs</h1>
        <button className='remove-btn sort-btn' onClick={() => sortData(faqs, 'question')} >Sort ASC</button>         {/* by using the onClick event we call the sortData function to srot ASC */}
        <button className='remove-btn sort-btn' onClick={() => sortDataDESC(faqs, 'question')} >Sort DESC</button>
      </div>

      <div className='faqs'>
        {
          faqs.map((faq, i) => {
            return (
              <FAQ key={i} faq={faq} index={i} toggleFAQ={toggleFAQ} removeFAQ={removeFAQ} editFAQ={editFAQ} />       // passing data by props to the FAQ for showing the whole FAQ part
            )
          })
        }
      </div>
      <AddFAQ addFAQ={addFAQ}  />                                                                                     {/*  passing addFAQ function as a props to AddFAQ */}
      <EditFAQ item={item} addFAQ={addFAQ} />                                                                         {/*  passing item and addFAQ as props to EditFAQ */}
      <Footer />                                                                     
    </>
  );
}

export default App;
