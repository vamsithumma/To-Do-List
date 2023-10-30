import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from 'react';
import Navbar from './layouts/Navbar';
import { BrowserRouter as Router, Route,Routes,   Link , useNavigate, Navigate} from 'react-router-dom';
import TodoPage from './components/TodoPage';
import ListAllTodos from './components/ListAllTodos';

function App() {
 
  return (
    <div>
       <Router>
        <Navbar />
        <Routes>
              <Route  path="/" element={<TodoPage />} /> 
              <Route path="/listalltodos" element={<ListAllTodos/>} />                   
        </Routes>
      </Router> 
      
      
      
    </div>
  );
};

export default App;
