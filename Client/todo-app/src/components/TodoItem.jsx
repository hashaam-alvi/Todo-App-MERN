
export default function TodoItem({ todo, refresh, openEditModal }) {

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
    <ul>
      <li style={{ textDecoration: todo.completed ? "line-through" : "" }}>
        {todo.content}
        <button onClick={toggle}>Done</button>
        <button onClick={deleteTodo}>Delete</button>
        <button onClick={() => openEditModal(todo)}>edit</button>
      </li>
    </ul>
  );
}
