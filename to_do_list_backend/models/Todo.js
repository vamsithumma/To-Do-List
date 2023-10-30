// models/Story.js
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  todo_content: String,
});


todoSchema.methods.editTodo = async function (newcontent) {
  this.todo_content = newcontent;
  await this.save();
};


const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
