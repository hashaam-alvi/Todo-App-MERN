export default function TodoItem({ todo, refresh, openEditModal }) {
  const deleteTodo = async () => {
    await fetch(`http://localhost:8081/todos/${todo._id}`, {
      method: "DELETE",
    });
    refresh();
  };

  const toggle = async () => {
    await fetch(`http://localhost:8081/todos/${todo._id}/toggle`, {
      method: "PATCH",
    });
    refresh();
  };

  return (
    <li className="TodoListLi">
      <div className="TodoListItems">
        <span className={`todo-text ${todo.completed ? "completed" : ""}`} >{todo.content}</span>
        <div className="TodoItembutton">
          <button className="doneBtn" disabled={todo.completed}  onClick={toggle}>
            Done
          </button>
          <button className="editBtn" disabled={todo.completed}  onClick={() => openEditModal(todo)}>
            Edit
          </button>
          <button className="delBtn" onClick={deleteTodo}>
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}
