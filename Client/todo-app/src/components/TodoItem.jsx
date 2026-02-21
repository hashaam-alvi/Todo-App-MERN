function TodoItem({ todo, refresh }) {

  const deleteTodo = async () => {
    await fetch(`http://localhost:8081/todos/${todo._id}`, {
      method: "DELETE"
    });
    refresh();
  };

  const toggle = async () => {
    await fetch(`http://localhost:8081/todos/${todo._id}/toggle`, {
      method: "PATCH"
    });
    refresh();
  };

  return (
    <li style={{ textDecoration: todo.completed ? "line-through" : "" }}>
      {todo.content}

      <button onClick={toggle}>Done</button>
      <button onClick={deleteTodo}>Delete</button>
    </li>
  );
}

export default TodoItem;