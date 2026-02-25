const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Todo = require("./models/Todo");
const Post = require("./models/Post");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URL || "mongodb://127.0.0.1:27017/todoapp")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const port =process.env.port  || 8081;

app.listen(port, () => {
  console.log("Server started on 8081");
});

// GET ALL TODOS
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// CREATE TODO
app.post("/todos", async (req, res) => {
  const { username, content } = req.body;
  const newTodo = new Todo({
    username,
    content,
  });
  await newTodo.save();
  res.json(newTodo);
});

// DELETE TODO
app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// TOGGLE COMPLETE
app.patch("/todos/:id/toggle", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.completed = !todo.completed;
  await todo.save();
  res.json(todo);
});

// Edit Todo
app.patch("/todos/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  let { content } = req.body;
  todo.content = content;
  await todo.save();
  res.json(todo);
  console.log("in Patch");
});

// GET POSTS
app.get("/posts", async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

app.get("/", (req, res) => {
  res.send("Server running");
});
