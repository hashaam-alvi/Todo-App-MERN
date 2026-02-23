const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Todo = require("./models/Todo");
const Post = require("./models/Post");

app.use(cors());
app.use(express.json());


mongoose.connect("mongodb://127.0.0.1:27017/todoapp")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


app.listen(8081, () => {

  console.log("Server started on 8081");

});


// GET ALL TODOS
app.get("/todos", async (req, res) => {

  console.log("GET /todos called");

  const todos = await Todo.find();

  res.json(todos);

});


// CREATE TODO
app.post("/todos", async (req, res) => {

  console.log("POST /todos called");

  const { username, content } = req.body;

  const newTodo = new Todo({

    username,
    content

  });

  await newTodo.save();

  res.json(newTodo);

});


// DELETE TODO
app.delete("/todos/:id", async (req, res) => {

  console.log("DELETE called");

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


// GET POSTS
app.get("/posts", async (req, res) => {

  console.log("GET /posts called");

  const posts = await Post.find();

  res.json(posts);

});


// TEST ROUTE
app.get("/", (req,res)=>{

  res.send("Server running");

});


