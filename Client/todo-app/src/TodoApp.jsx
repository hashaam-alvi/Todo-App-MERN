import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import AddFromPosts from "./components/AddFromPosts";
import AddNewTodo from "./components/AddNewTodo";
import "./components/style.css"

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  const openAddModal = () => {
    setEditingTodo(null);
    setIsModalOpen(true);
  };

  const openEditModal = (todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchTodos = async () => {
    const res = await fetch("http://localhost:8081/todos");
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="TodoAppContainer">
      <h1 className="title"><span>MERN</span>  Todo's</h1>

      <TodoList todos={todos} refresh={fetchTodos} openEditModal={openEditModal} />

      <AddFromPosts openAddModal={openAddModal}  refresh={fetchTodos} />

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">

            <AddNewTodo
              refresh={fetchTodos}
              closeModal={closeModal}
              existingTodo={editingTodo}
            />
            <br></br>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
