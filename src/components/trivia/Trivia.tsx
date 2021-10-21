import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './trivia.css';

export default function Trivia() {

  //Storing question,answer and category
  const [question, setQuestion] = useState({
    question: '',
    category: '',
    answer:''
  })


  const [loading, setLoading] = useState(true);

  //Answer by the user
  const [answer, setAnswer] = useState('');


  //Fetching the question from the API and saving it
  const getQuestion = async () => {
    try {
      const result: any = await axios.get('https://jservice.io/api/random');
      const data = {
        question: result.data[0].question,
        answer: result.data[0].answer,
        category:result.data[0].category.title
      }
      setQuestion(data);
      setLoading(false);
    } catch (error:any) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
    }
    
  }


  //Submit Answer - check 
  const submitAnswer = () => {
    if (answer === '') {
      toast.error("Please enter your answer before submission", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (answer.toLowerCase() === question.answer.toLowerCase()) {
      toast.success("WOW, Correct Answer !", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      
    } else {
      toast.error("Incorrect answer.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
    }
    getQuestion();
    setAnswer('');
  }

  useEffect(() => {
    getQuestion();
  },[])


  return loading ? (
    <div className="container loader">
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status"> 
        </div>
      </div>
    </div>
  
  ):(
    <div className="container trivia-card">
      <div className="card">
        <div className="card-header">
          {question.category.toUpperCase()}
        </div>
        <div className="card-body">
            <h5 className="card-title">{question.question}</h5>
            <input className="form-control" name="answer" onChange={(e)=>setAnswer(e.target.value)} value={answer} />
            <br></br>
            <button className="btn btn-success" onClick={submitAnswer}>Submit</button>
            <button className="btn btn-dark reset-button" onClick={() => setAnswer('')}>Reset Answer</button>
            
        </div>
      </div>
    </div>
  )
}
