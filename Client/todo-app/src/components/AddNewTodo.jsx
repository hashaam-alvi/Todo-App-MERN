import { useState, useEffect } from "react";
import "./TodoForm.css";

export default function AddNewTodo({ refresh, closeModal, existingTodo }) {
  let [formData, setFormData] = useState({
    username: "",
    content: "",
  });

  useEffect(() => {
    if (existingTodo) {
      setFormData({
        username: existingTodo.username,
        content: existingTodo.content,
      });
    }
  }, [existingTodo]);

  let handleInputChange = (event) => {
    setFormData((currData) => {
      return { ...currData, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, content } = formData;

    if (existingTodo) {
      await fetch(`http://localhost:8081/todos/${existingTodo._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, content }),
      });
    } else {
      await fetch("http://localhost:8081/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, content }),
      });
    }

    refresh();
    closeModal();
  };

  return (
    <div>
      <h1 className="Title" >{existingTodo ? "Edit Task" : "Create New Task"}</h1>
      <form onSubmit={handleSubmit} className="TodoForm">
        <label htmlFor="username">User Name</label>
        <input
          onChange={handleInputChange}
          placeholder="username"
          type="text"
          value={formData.username}
          id="username"
          name="username"
          readOnly={!!existingTodo}
          className={existingTodo ? "input-disabled" : ""}
          required
        />
        <label htmlFor="content">Task</label>
        <textarea
          onChange={handleInputChange}
          placeholder="Add a New Task"
          type="text"
          value={formData.content}
          id="content"
          name="content"
          required
        />
        <button>{existingTodo ? "Update Task" : "Submit Task"}</button>
      </form>
    </div>
  );
}
