import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import AddFromPosts from "./components/AddFromPosts";

function App() {

  const [todos, setTodos] = useState([]);

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

      <AddFromPosts refresh={fetchTodos} />

      <TodoList
        todos={todos}
        refresh={fetchTodos}
      />
    </div>
  );
}

export default App;