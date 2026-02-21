const Todo = require("../models/Todo");

exports.getTodos = async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
};

exports.createTodo = async (req, res) => {
  const { username, content } = req.body;

  const newTodo = new Todo({ username, content });

  await newTodo.save();

  res.json(newTodo);
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;

  await Todo.findByIdAndDelete(id);

  res.json({ success: true });
};

exports.toggleComplete = async (req, res) => {
  const { id } = req.params;

  const todo = await Todo.findById(id);

  todo.completed = !todo.completed;

  await todo.save();

  res.json(todo);
};