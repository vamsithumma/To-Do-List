// src/components/Leaderboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Icon from 'react-bootstrap-icons';


const ListAllTodos = () => {
  const [todolist, setTodolist] = useState([]);
  const [newcontent , setNewcontent] = useState('');
  const [inputstate , setInputstate] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    fetchTodoList();
  }, []); 

  const fetchTodoList = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/allTodos');
      setTodolist(response.data.allTodos);
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
    }
  };

  const handleEdit = async (cont , todoid) =>{
    setId(todoid);
    setInputstate(true);
    setNewcontent(cont);
  };

  const handleSubmit = async (todoId) => {
    try {
      const response = await axios.post('http://localhost:3001/api/edit_todo', {
        todoId, newcontent
      });
    } catch (error) {
      console.error('Error adding task:', error.message);
    }
    fetchTodoList();
    setInputstate(false);
  }

  const handleDelete = async (todoId) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/delete_todo${todoId}`);
      fetchTodoList();
    } catch (error) {
      console.error('Error Deleting Task:', error.message);
    }
  }

  const handleStatus = async (todoId, stat) => {
    var status = stat? false:true ;
    try {
      const response = await axios.post('http://localhost:3001/api/update_status', {
        todoId, status
      });
    } catch (error) {
      console.error('Error updating status of task:', error.message);
    }
    fetchTodoList();
  }

  return (
    <>
      {todolist!=[]? (
        <div className="container">
        <div>
          
          <ul class="list-unstyled">
            {todolist.map((todo) => (
              <div className="col-md-10 offset-md-1 border-success border rounded-5 p-2 mt-3 shadow">
                <li key={todo._id}>
                <div className="d-flex align-items-start">
                  {(inputstate && todo._id==id)? (
                    <>
                      <input
                      type="text"
                      className="text-center form-control border-success border rounded-5 m-2 fw-bold fst-italic fs-4 "
                      placeholder="Enter prompt to generate Story"
                      value={newcontent}
                      onChange={(e) => setNewcontent(e.target.value)}
                      />
                      <button
                        className="btn btn-success m-2 fs-4 pt-0 p-2"
                        onClick={()=>handleSubmit(todo._id)}
                      >
                      <Icon.FileEarmarkCheck/>
                      </button>  
                    </>
                    
                  ) : (<> 

                        {todo.todo_status? (
                          <button
                          type="text"
                          className="text-center form-control border-light border border-white bg-white rounded-5 m-2 fw-bold fst-italic fs-4"
                          disabled="true"
                          ><s>{todo.todo_content}</s></button>
                        ) : (
                          <input
                          type="text"
                          className="text-center form-control border-light border border-white bg-white rounded-5 m-2 fw-bold fst-italic fs-4"
                          value={todo.todo_content}
                          disabled="true"
                          />
                        )}
                        

                        <button
                          className="btn btn-success m-2 fs-4 pt-0 p-2"
                          onClick={()=>handleStatus(todo._id, todo.todo_status)}
                          >
                          <Icon.Check2All/>
                        </button> 
                        <button
                          className="btn btn-primary m-2 fs-4 pt-0 p-2"
                          onClick={()=>handleEdit(todo.todo_content, todo._id)}
                          >
                          <Icon.PencilSquare/>
                        </button> 

                        <button className="btn btn-danger m-2 fs-4 pt-0 p-2" 
                          onClick={()=> handleDelete(todo._id)}
                          ><Icon.Trash3/></button>
                         </>) }

                </div>
              </li>
  
              </div>
              
            ))}
          </ul>
        </div>   
      </div>

      ):(<p class="fst-italic text-center fs-6 mt-5"> No Task to Display, Add your first Task</p>)}
    </>
    
  );
};

export default ListAllTodos;
