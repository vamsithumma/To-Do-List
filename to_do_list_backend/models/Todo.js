// models/Story.js
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  todo_content: String,
  todo_status : {type : Boolean, default: false},
});


todoSchema.methods.editTodo = async function (newcontent) {
  this.todo_content = newcontent;
  await this.save();
};

todoSchema.methods.updateStatus = async function (status) {
  this.todo_status = status;
  await this.save();
}


const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
