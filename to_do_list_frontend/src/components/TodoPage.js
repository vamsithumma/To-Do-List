// src/components/TodoPage.js
import React, { useState } from 'react';
import axios from 'axios';
import ListAllTodos from './ListAllTodos';

const TodoPage = () => {
  const [content, setContent] = useState('');
  const [generatedStory, setGeneratedStory] = useState('');
  const [currentStoryId, setCurrentStoryId] = useState(null);
  const [genre,setGenre] = useState('comedy');
  const [sendPrompt,setSendPrompt] = useState('');
  const [words, setWords] = useState(50); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(content!=""){
      try {
        const response = await axios.post('http://localhost:3001/api/addTodo', {
          content
        });
        setContent('');
      } catch (error) {
        console.error('Error adding task:', error.message);
      }
    }else{
      alert("field is empty");
    }
    
  };

  return (
    <>
      <div className="container">
        <div className="col-md-10 offset-md-1 border border-success rounded p-4 mt-5 shadow border rounded-5">
          <form onSubmit={handleSubmit}>
          <div className="m-3">
            <h3 className="fw-bold fst-italic text-center m-2 fs-2">Add Your Task</h3>
            <div className="d-flex align-items-start">
              <input
                  type="text"
                  className="text-center form-control border-primary border rounded-5 m-2 fw-bold fs-5"
                  placeholder="Enter your Task"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <button className="btn btn-success m-2 " type="submit">Add</button>
              </div> 
              </div>
            </form>    
            <p className='fst-italic text-center'>View Yours tasks on Your-Tasks tab.</p>
        </div>
      </div>
    </>
  );
};

export default TodoPage;
