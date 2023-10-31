// routes/api.js
const express = require('express');
const Todo = require('../models/Todo');

const router = express.Router();


router.get('/allTodos', async (req, res) => {
  const allTodos = await Todo.find();
  res.json({ allTodos });
});

router.post('/addTodo', async (req, res) => {
  const { content } = req.body;
  const todo = new Todo({ todo_content : content });
  await todo.save();
  res.json({ todo: content , todoId: todo._id});
});


router.post('/edit_todo', async (req, res) => {
  //console.log(req.body);
  const { todoId , newcontent} = req.body;
  try {
    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).json({ error: 'Task not found' });
    }
    await todo.editTodo(newcontent);
    res.json({ message: 'Edited successfully' });
  } catch (error) {
    console.error('Error editing task:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/update_status', async(req,res) =>{
  const { todoId , status} = req.body;
  try {
    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).json({ error: 'Task not found' });
    }
    await todo.updateStatus(status);
    res.json({ message: 'Status Updated successfully' });
  } catch (error) {
    console.error('Error updting status of task:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }

});

router.delete(`/delete_todo:id`, async (req,res) =>{
  const todoId = req.params.id;
  console.log(todoId);
  try{
    await Todo.findByIdAndRemove(todoId);
    res.json({ message: 'Deleted successfully' });
  }catch{
    console.error('Error deleting task:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
  
});


module.exports = router;
