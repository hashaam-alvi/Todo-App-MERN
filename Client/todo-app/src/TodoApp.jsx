import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import AddFromPosts from "./components/AddFromPosts";
import AddNewTodo from "./components/AddNewTodo";

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
    <div>
      <h1>MERN Todo</h1>

      <AddFromPosts openAddModal={openAddModal}  refresh={fetchTodos} />

      <TodoList todos={todos} refresh={fetchTodos} openEditModal={openEditModal} />

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={closeModal}>×</button>

            <AddNewTodo
              refresh={fetchTodos}
              closeModal={closeModal}
              existingTodo={editingTodo}
            />
          </div>
        </div>
      )}
    </div>
  );
}
